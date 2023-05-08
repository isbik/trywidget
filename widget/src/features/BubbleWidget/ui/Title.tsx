import { Show } from "solid-js";
import { settingsState, widgetState } from "../../../store";

export const Title = () => {
  return (
    <Show when={settingsState().showTitle}>
      <p
        class="z-10 absolute max-w-[calc(100%-64px)] left-2 right-6 top-2 w-full m-auto"
        style={{
          color: settingsState().titleColor,
          "text-align": settingsState().titleAlign as any,
        }}
      >
        {widgetState()?.name}
      </p>
    </Show>
  );
};
