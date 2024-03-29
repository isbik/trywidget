import { Show } from "solid-js";
import { clickCtaMetric } from "../../../lib/metrics";
import { settingsState } from "../../../store";

export const CTAButton = () => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const settings = settingsState();

    const action = settings.ctaClickAction;

    clickCtaMetric();

    if (action === "link") {
      window.open(
        settings.ctaOpenLink,
        settings.ctaOpenNewTab ? "_blank" : "_self",
      );
    }

    if (action === "scroll") {
      document.getElementById(settings.ctaClickSelector)?.scrollIntoView();
    }

    if (action === "code") {
      window?.twCtaClick?.();
    }
  };

  return (
    <Show when={settingsState().ctaShow}>
      <button
        onClick={handleClick}
        class="border-none m-auto transition-all px-2 py-3 w-full my-1 max-w-[300px] hover:opacity-90 cursor-pointer"
        style={{
          background: settingsState().ctaButtonColor,
          color: settingsState().ctaTextColor,
          "border-radius": settingsState().ctaBorderRadius + "px",
          "font-weight": settingsState().ctaIsFontWeight ? "bold" : "normal",
          "font-size": settingsState().ctaFontSize + "px",
        }}
      >
        {settingsState().ctaText}
      </button>
    </Show>
  );
};
