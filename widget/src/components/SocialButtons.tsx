import { Show, createMemo } from "solid-js";
import { settingsState } from "../store";

type Props = {};

export const SocialButtons = (props: Props) => {
  const hrefWhatsApp = createMemo(() => {
    const phone = settingsState().ctaWhatsAppNumber;
    const text = settingsState().ctaWhatsAppText;

    return `whatsapp://send?abid=${phone}&text=${text}"`;
  });

  return (
    <div class="flex items-center justify-center gap-4 my-2">
      <Show when={settingsState().ctaShowVk}>
        <a
          target="_blank"
          href={"https://t.me/" + settingsState().ctaVkLink}
        >
          <img class="w-10" src="/static/logos/vk.svg" alt="Vk Logo" />
        </a>
      </Show>

      <Show when={settingsState().ctaShowTelegram}>
        <a
          target="_blank"
          href={"https://t.me/" + settingsState().ctaTelegramChannel}
        >
          <img
            class="w-10"
            src="/static/logos/telegram.svg"
            alt="Telegram logo"
          />
        </a>
      </Show>
      <Show when={settingsState().сtaShowWhatsApp}>
        <a target="_blank" href={hrefWhatsApp()}>
          <img
            class="w-10"
            src="/static/logos/whatsapp.svg"
            alt="Whatsapp logo"
          />
        </a>
      </Show>
    </div>
  );
};
