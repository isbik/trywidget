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
    <div class="flex items-center justify-center gap-2 my-1">
      <Show when={settingsState().ctaShowTelegram}>
        <a
          target="_blank"
          href={"https://t.me/" + settingsState().ctaTelegramChannel}
        >
          <img
            class="w-10"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.forexnewsnow.com%2Fwp-content%2Fuploads%2F2018%2F04%2FTelegram-logo.png&f=1&nofb=1&ipt=7e68a348b93ed5db207b8a460845958b9df69f5be7792ec3391cc4aa30014f55&ipo=images"
            alt="Telegram"
          />
        </a>
      </Show>
      <Show when={settingsState().сtaShowWhatsApp}>
        <a target="_blank" href={hrefWhatsApp()}>
          <img
            class="w-10"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F04%2FWhatsApp-PNG-Picture.png&f=1&nofb=1&ipt=3cdaadb99ef2c71ab76c19594a012a63e062523917d7575cc6ea0801fd90fb3d&ipo=images"
            alt="Telegram"
          />
        </a>
      </Show>
    </div>
  );
};
