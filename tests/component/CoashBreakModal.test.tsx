import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";

import { CoachBreakModal } from "@/components/modal/CoachBreakModal";
import { useCoachTips } from "@/hooks/useCoachTips";
import { useTranslation } from "react-i18next";

jest.mock("@/hooks/useCoachTips");
jest.mock("react-i18next");

describe("[COMPONENT TEST]: CoachBreakModal", () => {
  const tipMock = {
    emoji: "💡",
    category: "testCategory",
    key: "testKey"
  };

  beforeEach(() => {
    (useCoachTips as jest.Mock).mockImplementation((visible: boolean) =>
      visible ? tipMock : null
    );

    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => {
        if (key === `coachTips.${tipMock.category}.${tipMock.key}`) return "Test tip text";
        if (key === "coachTips.seconds_left") return "seconds";
        if (key === "coachTips.close") return "Close";
        return key;
      }
    });
  });

  it("Does not render when visible=false", () => {
    const { queryByText } = render(<CoachBreakModal visible={false} onClose={jest.fn()} />);
    expect(queryByText(tipMock.emoji)).toBeNull();
  });

  it("Renders when visible=true and shows emoji, tip text, timer and button", () => {
    const { getByText } = render(
      <CoachBreakModal visible={true} onClose={jest.fn()} timerDuration={10} />
    );

    expect(getByText(tipMock.emoji)).toBeTruthy();
    expect(getByText("Test tip text")).toBeTruthy();
    expect(getByText("10 seconds")).toBeTruthy();
    expect(getByText("Close")).toBeTruthy();
  });

  it("Pressing the button calls onClose", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <CoachBreakModal visible={true} onClose={onCloseMock} timerDuration={5} />
    );

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("Timer decreases and calls onClose when it reaches 0", () => {
    jest.useFakeTimers();
    const onCloseMock = jest.fn();
    render(<CoachBreakModal visible={true} onClose={onCloseMock} timerDuration={2} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
