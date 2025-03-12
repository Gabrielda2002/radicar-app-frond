import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
      YT: typeof YT;
      onYouTubeIframeAPIReady: () => void;
    }
  }

export const useYoutubePlayer = () => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
    const youtubeContainerRef= useRef<HTMLDivElement>(null);

  const videoId = "EE80XTkyPYc";

  useEffect(() => {
    if (!isModalOpen) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else if (!playerReady) {
      initializePlayer();
    }
  }, [isModalOpen]);

  const initializePlayer = () => {
    if (!youtubeContainerRef.current) return;

    // Create a div element for YouTube player
    const playerDiv = document.createElement("div");
    playerDiv.className = "w-full h-full";
    youtubeContainerRef.current.appendChild(playerDiv);

    const newPlayer = new window.YT.Player(playerDiv, {
      videoId,
      playerVars: {
        controls: 0, // Oculta los controles nativos
        rel: 0, // No muestra videos relacionados
        autoplay: 1, // Reproduce automáticamente
        modestbranding: 1, // Oculta el logo de YouTube
        iv_load_policy: 3, // Oculta las anotaciones del video
        disablekb: 1, // Deshabilita los controles de teclado
        fs: 0, // Deshabilita el botón de pantalla completa
        playsinline: 1, // Reproduce el video en línea (corrected from playinline)
      },
      events: {
        onReady: () => setPlayerReady(true),
        onStateChange: handlePlayerStateChange,
      },
    });

    setPlayer(newPlayer);
  };

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    // YT.PlayerState.ENDED = 0
    if (event.data === 0) {
      setVideoCompleted(true);
    }
    // YT.PlayerState.PAUSED = 2
    if (event.data === 2) {
      setIsPaused(true);
    }
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      setIsPaused(false);
    }
  };

  const handlePlayPause = () => {
    if (!player) return;
    if (isPaused) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  };

  return {
    videoCompleted,
    isModalOpen,
    setIsModalOpen,
    isPaused,
    playerReady,
    youtubeContainerRef,
    handlePlayPause,
    player,
  }
};
