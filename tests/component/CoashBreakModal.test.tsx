import { CoachBreakModal } from "@/components/modal/CoachBreakModal";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";

import { useCoachTips } from "@/hooks/useCoachTips";
import { useTranslation } from "react-i18next";

jest.mock("@/hooks/useCoachTips");
jest.mock("react-i18next");

describe("CoachBreakModal", () => {
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
      t: (key: string, def?: string) => {
        if (key === "seconds_left") return "секунд";
        if (key === "close") return "Закрити";
        return def || key;
      }
    });
  });

  it("не рендериться коли visible=false", () => {
    const { queryByText } = render(<CoachBreakModal visible={false} onClose={jest.fn()} />);
    expect(queryByText("💡")).toBeNull();
  });

  it("рендериться коли visible=true і показує emoji, текст поради, таймер і кнопку", () => {
    const { getByText } = render(
      <CoachBreakModal visible={true} onClose={jest.fn()} timerDuration={10} />
    );

    expect(getByText("💡")).toBeTruthy();
    expect(getByText("Порада недоступна")).toBeTruthy();
    expect(getByText("10 секунд")).toBeTruthy();
    expect(getByText("Закрити")).toBeTruthy();
  });

  it("натискання на кнопку викликає onClose", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <CoachBreakModal visible={true} onClose={onCloseMock} timerDuration={5} />
    );

    const closeButton = getByText("Закрити");
    fireEvent.press(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("таймер зменшується і викликає onClose при досягненні 0", () => {
    jest.useFakeTimers();
    const onCloseMock = jest.fn();
    render(<CoachBreakModal visible={true} onClose={onCloseMock} timerDuration={2} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
