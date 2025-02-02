import { ApiOperation } from "../ApiOperation";

export const StationOperation: ApiOperation<StationRequest, StationResponse> = {
  request: (params: StationRequest) => `/api/${params.user_id}/station`,
  init: (params: StationRequest) => ({
    method: "GET",
  }),
};

/** 방송국 디스플레이 설정 */
type StationDisplay = {
  /** 메인 레이아웃 타입 */
  main_type: string;
  /** 제목 표시 타입 (HTML/TEXT) */
  title_type: "HTML" | "TEXT";
  /** 제목 텍스트 내용 */
  title_text: string;
  /** 프로필 텍스트 표시 설정 */
  profile_text: string;
  /** 스킨 타입 */
  skin_type: number;
  /** 스킨 번호 */
  skin_no: number;
};

/** 현재 방송 정보 */
type CurrentBroadcast = {
  /** BJ 아이디 */
  user_id: string;
  /** 방송 번호 */
  broad_no: number;
  /** 방송 제목 */
  broad_title: string;
  /** 현재 누적 시청자 수 */
  current_sum_viewer: number;
  /** 방송 등급 */
  broad_grade: number;
  /** 비밀번호 설정 여부 */
  is_password: boolean;
};

/** 구독 정보 */
type Subscription = {
  /** 전체 구독자 수 */
  total: number;
  /** tier1 구독자 수 */
  tier1: number;
  /** tier2 구독자 수 */
  tier2: number;
};

/** 방송국 기본 정보 */
type Station = {
  /** 디스플레이 설정 */
  display: StationDisplay;
  /** 방송국 그룹 정보 */
  groups: any[]; // 상세 타입 필요시 추가
  /** 방송국 메뉴 정보 */
  menus: any[]; // 상세 타입 필요시 추가
  /** 방송 시작 시간 */
  broad_start: string;
  /** 방송국 등급 */
  grade: number;
  /** 방송국 가입 시간 */
  jointime: string;
  /** 방송국 이름 */
  station_name: string;
  /** 방송국 번호 */
  station_no: number;
  /** 방송국 제목 */
  station_title: string;
  /** 총 방송 시간 (초) */
  total_broad_time: number;
  /** BJ 아이디 */
  user_id: string;
  /** BJ 닉네임 */
  user_nick: string;
};

type StationRequest = {
  user_id: string;
};

/** Station API 응답 타입 */
type StationResponse = {
  /** 프로필 이미지 URL */
  profile_image: string;
  /** 방송국 정보 */
  station: Station;
  /** 현재 방송 정보 */
  broad: CurrentBroadcast;
  /** 구독 정보 */
  subscription: Subscription;
};

export type {
  CurrentBroadcast,
  Station,
  StationDisplay,
  StationRequest,
  StationResponse,
  Subscription,
};
