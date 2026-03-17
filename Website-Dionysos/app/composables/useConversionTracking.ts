type ConversionChannel = "discord" | "instagram";

type TrackOptions = {
  placement: string;
};

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function useConversionTracking() {
  const trackConversionClick = (channel: ConversionChannel, options: TrackOptions) => {
    if (!import.meta.client) return;
    if (typeof window.plausible !== "function") return;

    window.plausible("conversion_click", {
      props: {
        channel,
        placement: options.placement,
      },
    });
  };

  return { trackConversionClick };
}
