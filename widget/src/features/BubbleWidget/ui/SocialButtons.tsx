import { Show, createMemo } from "solid-js";
import { settingsState } from "../../../store";

type Props = {};

export const SocialButtons = (props: Props) => {
  const hrefWhatsApp = createMemo(() => {
    const phone = settingsState().ctaWhatsAppNumber;
    const text = settingsState().ctaWhatsAppText;

    return `whatsapp://send?abid=${phone}&text=${text}"`;
  });

  console.log(window.location);

  const url = window.location.host.includes("localhost")
    ? "http://localhost:3000"
    : "https://trywidget.ru";

  return (
    <div class="flex items-center justify-center gap-4 my-2">
      <Show when={settingsState().ctaShowVk}>
        <a target="_blank" href={"https://t.me/" + settingsState().ctaVkLink}>
          <img class="w-10" src={url + "/static/logos/vk.svg"} alt="Vk Logo" />
        </a>
      </Show>

      <Show when={settingsState().ctaShowTelegram}>
        <a
          target="_blank"
          href={"https://t.me/" + settingsState().ctaTelegramChannel}
        >
          <img
            class="w-10"
            src={url + "/static/logos/telegram.svg"}
            alt="Telegram logo"
          />
        </a>
      </Show>
      <Show when={settingsState().сtaShowWhatsApp}>
        <a target="_blank" href={hrefWhatsApp()}>
          <img
            class="w-10"
            src={url + "/static/logos/whatsapp.svg"}
            alt="Whatsapp logo"
          />
        </a>
      </Show>
    </div>
  );
};
