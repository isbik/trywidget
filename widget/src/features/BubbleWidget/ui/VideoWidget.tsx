import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { MinusIcon } from "../../../icons/Minus";
import { SpeakerWaveIcon } from "../../../icons/SpeakerWave";
import { SpeakerXMarkIcon } from "../../../icons/SpeakerXMark";
import { XMarkIcon } from "../../../icons/XMark";
import { fullWatchedMetric, openWidgetMetric } from "../../../lib/metrics";
import { setGlobalShow, settingsState, widgetState } from "../../../store";
import { CTAButton } from "./CTAButton";
import { SocialButtons } from "./SocialButtons";
import { Title } from "./Title";

type Props = {};

const BORDER_WIDTH = 4;

export const VideoWidget = (props: Props) => {
  const settings = settingsState();
  const widget = widgetState();

  let wrapperRef: HTMLDivElement;
  let videoRef: HTMLVideoElement | null;
  const [expanded, setExpanded] = createSignal(false);
  const [hideWidget, setHideWidget] = createSignal(true);

  const calculatePosition = () => {
    const settings = settingsState();

    if (!wrapperRef) return;

    wrapperRef.style.bottom = settings?.edgeMargins + "px";

    if (settings.placement === "left") {
      wrapperRef.style.left = settings?.edgeMargins + "px";
      wrapperRef.style.right = "initial";
    }

    if (settings.placement === "right") {
      wrapperRef.style.right = settings?.edgeMargins + "px";
      wrapperRef.style.left = "initial";
    }
  };

  createEffect(() => {
    calculatePosition();
  });

  onMount(() => {
    window.addEventListener("resize", calculatePosition);
  });

  onCleanup(() => {
    window.removeEventListener("resize", calculatePosition);
  });

  onMount(() => {
    if (settings.showingCondition === "immediately") {
      setHideWidget(false);
    }

    if (settings.showingCondition === "time") {
      let timeout = setTimeout(() => {
        setHideWidget(() => false);
      }, settings.showingAfterTime * 1000);

      onCleanup(() => clearInterval(timeout));
    }

    if (settings.showingCondition === "intersection") {
      setTimeout(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            setHideWidget(false);
          }
        };

        let observer = new IntersectionObserver(callback);

        observer.observe(document.querySelector(settings.showingSelector)!);
      }, 1);
    }
  });

  const onClickWrapper = (event: MouseEvent) => {
    setMuted(false);

    const settings = settingsState();

    if (!expanded() && videoRef) {
      videoRef.currentTime = 0;
      openWidgetMetric();
    }

    setExpanded(true);

    if (expanded() && settings.enableExpandFullScreen) {
      if (settings.placement === "left") {
        wrapperRef.style.left = "0px";
      }
      if (settings.placement === "right") {
        wrapperRef.style.right = "0px";
      }

      wrapperRef.style.bottom = "0px";
    } else {
      calculatePosition();
    }
  };

  const wrapperWidth = createMemo(() => {
    const settings = settingsState();

    if (settings.enableExpandFullScreen && expanded()) {
      return document.documentElement.clientWidth;
    }

    const maxWidth =
      document.documentElement.clientWidth -
      settings.edgeMargins * 2 -
      BORDER_WIDTH * 2;

    if (expanded()) {
      return Math.min(
        settings.width * settings.scaleView - settings.edgeMargins * 3,
        maxWidth,
      );
    }

    return Math.min(settings.width, maxWidth);
  });

  const wrapperHeight = createMemo(() => {
    const settings = settingsState();

    if (settings.enableExpandFullScreen && expanded()) {
      return document.documentElement.clientHeight;
    }

    const maxHeight =
      window.innerHeight - settings.edgeMargins * 2 - BORDER_WIDTH * 2;

    if (expanded()) {
      return Math.min(settings.height * settings.scaleView, maxHeight);
    }

    if (settings.shape === "circle") {
      return Math.min(settings.width, maxHeight, wrapperWidth());
    }

    return Math.min(settings.height, maxHeight);
  });

  const [playing, setPlaying] = createSignal(true);
  const [muted, setMuted] = createSignal(true);

  const onClickVideo = () => {
    if (!expanded()) return;

    setPlaying((p) => !p);

    if (playing()) {
      videoRef?.play();
    } else {
      videoRef?.pause();
    }
  };

  const handleMuteClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setMuted((p) => !p);
  };

  const handleCloseClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!expanded()) {
      setGlobalShow(false);
      return;
    }

    setExpanded(false);

    setMuted(true);
    if (videoRef) videoRef.currentTime = 0;
  };

  const [currentTime, setCurrentTime] = createSignal(0);
  const [totalTime, setTotalTime] = createSignal(0);

  createEffect(() => {
    const diff = totalTime() - currentTime();

    if (diff < 0.5) {
      fullWatchedMetric();
    }
  });

  onMount(() => {
    videoRef?.addEventListener("loadeddata", () => {
      if (videoRef) setTotalTime(videoRef.duration);
    });

    videoRef?.addEventListener("timeupdate", () => {
      if (videoRef) setCurrentTime(videoRef.currentTime);
    });
  });

  const wrapperBorderRadius = createMemo(() => {
    const settings = settingsState();

    if (settings.enableExpandFullScreen) {
      return "0px";
    }

    return settings.shape === "circle" && !expanded()
      ? "50%"
      : settings.borderRadius + "px";
  });

  const closeIconTop = createMemo(() => {
    const settings = settingsState();

    return (
      (settings.shape === "circle" && !expanded() ? wrapperWidth() / 10 : 8) +
      "px"
    );
  });

  const closeIconRight = createMemo(() => {
    const settings = settingsState();

    return (
      (settings.shape === "circle" && !expanded()
        ? wrapperWidth() / 2 - 12
        : 8) + "px"
    );
  });

  const wrapperBorder = createMemo(() => {
    const settings = settingsState();

    return settings.showBorder ? undefined : "none";
  });

  const borderWrapper = createMemo(() => {
    const settings = settingsState();

    if (expanded() && settings.enableExpandFullScreen) {
      return "none";
    }

    return `${BORDER_WIDTH}px solid ${settings.borderColor}`;
  });

  const borderHover = createMemo(() => {
    const settings = settingsState();

    if (expanded() && settings.enableExpandFullScreen) {
      return "none";
    }

    return `${BORDER_WIDTH}px solid ${settings.borderHoverColor}`;
  });

  return (
    <>
      <style>
        {`
            .vw-wrapper{
              border: ${borderWrapper()};
            }

            .vw-wrapper:hover {
              transform: ${
                expanded() || settingsState().enableExpandFullScreen
                  ? ""
                  : "translateY(-10px)"
              };
              border: ${borderHover()};
            }

            .close-icon {
                display: ${!expanded() && "none"};
            }
            .vw-wrapper:hover .close-icon{
              display: flex;
            }
          `}
      </style>

      <div
        draggable
        data-vidget-id="test"
        ref={wrapperRef!}
        class={`vw-wrapper fixed transition-[border,transform,border-radius] ${
          expanded() ? " " : " cursor-pointer"
        }`}
        style={{
          border: wrapperBorder(),
          "transform-origin": `bottom ${settings.placement}`,
          "border-radius": wrapperBorderRadius(),
          overflow: "hidden",
          display: hideWidget() ? "none" : "block",
          background: "inherit",
        }}
        onclick={onClickWrapper}
      >
        <div
          class="relative transition-all"
          style={{
            width: wrapperWidth() + "px",
            height: wrapperHeight() + "px",
            "transform-origin": "bottom right",
          }}
        >
          <button
            onclick={handleCloseClick}
            class="close-icon absolute z-10 bg-slate-300/50 rounded-full w-6 h-6 flex items-center justify-center transition-[top,right] cursor-pointer"
            style={{
              top: closeIconTop(),
              right: closeIconRight(),
            }}
          >
            {expanded() ? <MinusIcon class="w-4" /> : <XMarkIcon class="w-4" />}
          </button>

          {expanded() && settingsState().showControls && (
            <>
              <button
                onclick={handleMuteClick}
                class="absolute top-10 right-2 z-10 bg-slate-300/50 rounded-full w-6 h-6 flex items-center justify-center"
              >
                {muted() ? (
                  <SpeakerXMarkIcon class="w-4" />
                ) : (
                  <SpeakerWaveIcon class="w-4" />
                )}
              </button>
            </>
          )}
          {expanded() && <Title />}

          <div class="flex">
            {settingsState().showingPreview && !expanded() ? (
              <img
                class="absolute h-full w-full object-cover"
                src={widget?.video?.preview_image_url}
                alt="Превью"
              />
            ) : (
              <video
                ref={videoRef!}
                class="absolute left-1/2 top-1/2 h-full w-full object-cover"
                src={widget?.video?.url}
                loop
                playsinline
                muted={muted()}
                preload="auto"
                style={{
                  transform: "translate(-50%,-50%)",
                }}
                onclick={onClickVideo}
                autoplay
                // @ts-ignore
                disablePictureInPicture
              />
            )}

            {expanded() && (
              <div
                class="absolute z-10 left-2 right-2 flex flex-col bottom-0"
                style={{
                  bottom: settings.borderRadius / 2 + "px",
                }}
              >
                <SocialButtons />

                {currentTime() > settingsState().ctaTimeToShow && <CTAButton />}

                {/* {settingsState().showControls && (
                  <div class="relative rounded-full overflow-hidden mb-1">
                    <div class="w-full bg-black/80 h-[5px]"></div>
                    <div
                      class="w-full bg-red-400 h-[3px] absolute top-[1px]"
                      style={{
                        width: (currentTime() / totalTime()) * 100 + "%",
                      }}
                    ></div>
                  </div>
                )} */}

                {widget?.plan?.is_hide_logo !== true && (
                  <a
                    href="https://trywidget.ru"
                    target="_blank"
                    class="gap-2 bg-black/80 p-[4px] text-center text-white text-[12px] mt-1 -mx-2 -mb-3 w-[calc(100%+16px)] flex justify-center items-center"
                  >
                    <img class="w-4 h-4" src="/static/logo.svg" alt="Логотип" />
                    Trywidget
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
