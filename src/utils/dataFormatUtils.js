/* eslint-disable no-useless-escape */
// 비디오 데이터를 문자열로 변환하는 함수
export const videoDataToString = (videoData) => {
  if (!Array.isArray(videoData)) return "";
  const videoIds = videoData.map((v) => v.videoId).join(",");
  return videoIds;
};

// ISO 8601 형식의 지속 시간을 HH:MM:SS 또는 M:SS 형식으로 변환하는 함수
export const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  if (hours > 0) {
    const h = String(hours);
    return `${h}:${m}:${s}`; // 예: 1:05:09
  } else {
    return `${minutes}:${s}`; // 예: 5:09 (앞에 0 안 붙음)
  }
};

// ISO 8601 형식의 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`; // 예: 2023-08-15
};

// 유튜브 URL에서 비디오 ID를 추출하는 함수
export const extractVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
