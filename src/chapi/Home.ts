import { ApiOperation } from "../ApiService";

export const HomeOperation: ApiOperation<HomeRequest, HomeResponse> = {
  request: (params: HomeRequest) => `/api/${params.user_id}/home`,
  init: (params: HomeRequest) => ({
    method: "GET",
    headers: {
      Referer: `https://ch.sooplive.com/${params.user_id}`,
    },
  }),
};

/** 방송국 홈 통계 정보 */
type HomeStats = {
  /** 총 방문자 수 */
  total_visit: number;
  /** 오늘 방문자 수 */
  today_visit: number;
  /** 팬클럽 회원 수 */
  fan_count: number;
  /** 즐겨찾기 수 */
  favorite_count: number;
};

/** VOD 정보 */
type VODItem = {
  /** VOD 번호 */
  vod_no: number;
  /** VOD 제목 */
  vod_title: string;
  /** 재생 시간 (초) */
  play_time: number;
  /** 썸네일 이미지 URL */
  thumbnail_url: string;
  /** 조회수 */
  view_count: number;
  /** 업로드 시간 */
  upload_time: string;
};

/** 클립 정보 */
type ClipItem = {
  /** 클립 번호 */
  clip_no: number;
  /** 클립 제목 */
  clip_title: string;
  /** 재생 시간 (초) */
  duration: number;
  /** 썸네일 이미지 URL */
  thumbnail_url: string;
  /** 조회수 */
  view_count: number;
  /** 생성 시간 */
  create_time: string;
};

/** 최근 방송 정보 */
type RecentBroadcast = {
  /** 방송 번호 */
  broad_no: number;
  /** 방송 제목 */
  broad_title: string;
  /** 시작 시간 */
  start_time: string;
  /** 종료 시간 */
  end_time: string;
  /** 최대 시청자 수 */
  max_viewer: number;
  /** 누적 시청자 수 */
  total_viewer: number;
};

/** 공지사항 */
type Notice = {
  /** 공지 번호 */
  notice_no: number;
  /** 공지 제목 */
  title: string;
  /** 공지 내용 */
  content: string;
  /** 작성 시간 */
  write_time: string;
  /** 고정 여부 */
  is_fixed: boolean;
};

type HomeRequest = {
  user_id: string;
};

/** Home API 응답 인터페이스 */
type HomeResponse = {
  /** VOD 목록 */
  vods: VODItem[];
  /** 게시글 목록 */
  boards: BoardItem[];
  /** 유저 VOD 목록 */
  user_vods: VODItem[];
  /** 유저 게시글 목록 */
  user_boards: BoardItem[];
  /** 캐치스토리 목록 */
  catchstorys: object[];
  /** 재생목록 */
  playlists: object[];
  /** 숩토어 아이템 */
  sooptore: object[];
  /** 배너 목록 */
  banners: object[];
  /** 광고 허용 여부 */
  is_adsence: boolean;
  /** 애드벌룬 이벤트 정보 */
  adballoon_event: {
    /** 종료 여부 */
    end_yn: boolean;
    /** 퍼센트 */
    percent: number;
  };
};

/** 게시글 정보 */
type BoardItem = {
  /** 방송국 번호 */
  station_no: number;
  /** 게시판 번호 */
  bbs_no: number;
  /** 제목 번호 */
  title_no: number;
  /** 제목 */
  title_name: string;
  /** 내용 */
  content: string;
  /** 작성자 닉네임 */
  user_nick: string;
  /** 작성자 ID */
  user_id: string;
  /** BJ ID */
  bj_id: string | null;
  /** 작업자 닉네임 */
  worker_nick: string | null;
  /** 작업자 ID */
  worker_id: string | null;
  /** 로그인 ID */
  login_id: string;
  /** 게시판 타입 */
  board_type: number;
  /** 프로필 이미지 URL */
  profile_image: string;
  /** 썸네일 URL */
  thumb: string | null;
  /** 등록일 */
  reg_date: string;
  /** 조회수/댓글수 정보 */
  count: {
    /** 조회수 */
    read_cnt: number;
    /** 댓글수 */
    comment_cnt: number;
  };
  /** 고정글 여부 */
  is_pin: boolean;
  /** 인기글 여부 */
  is_hit: boolean;
  /** 공지글 여부 */
  is_notice: boolean;
  /** 소유자 여부 */
  is_owner: boolean;
  /** 관리자 여부 */
  is_manager: boolean;
};

export type {
  HomeRequest,
  HomeResponse,
  HomeStats,
  VODItem,
  ClipItem,
  RecentBroadcast,
  Notice,
};
