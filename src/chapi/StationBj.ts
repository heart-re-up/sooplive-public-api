import { ApiOperation } from "../ApiService";

export const StationBjOperation: ApiOperation<
  StationBjRequest,
  StationBjResponse
> = {
  request: (params: StationBjRequest) => `/api/${params.user_id}/station/bj`,
  init: (params: StationBjRequest) => ({
    method: "GET",
    headers: {
      Referer: `https://ch.sooplive.com/${params.user_id}`,
    },
  }),
};

/** 메달 ID 타입 */
type MedalId =
  | "AWARD2024_STREAMER"
  | "AWARD2023_STREAMER"
  | "AWARD2022_STREAMER"
  | "AWARD2021_STREAMER"
  | "AWARD2020_STREAMER"
  | "AWARD2019_STREAMER"
  | "BEST_STREAMER"
  | "PARTNER_STREAMER"
  | string;

/**
 * BJ가 획득한 메달/뱃지 정보
 */
type Medal = {
  /** 메달의 고유 식별자 (예: 'AWARD2024_STREAMER') */
  id: MedalId;
  /** 메달의 단축 키 (예: 'a2024') */
  key: string;
  /** 메달의 표시 이름 */
  name: string;
  /** 메달에 대한 상세 설명 */
  description: string;
};

/**
 * BJ의 소셜 미디어 링크 정보
 */
type SocialLink = {
  /** 링크의 고유 번호 */
  no: number;
  /** 링크 타입 (2: 인스타그램, 3: 유튜브, 4: 네이버) */
  type: number;
  /** 링크 표시 이름 */
  link_name: string;
  /** 소셜 미디어 플랫폼 코드 */
  code: "youtube" | "instagram" | "naver" | string;
  /** 링크 관련 이미지 URL */
  image: string | null;
  /** 실제 소셜 미디어 링크 URL */
  url: string;
};

/**
 * 방송국 채널 아트(배경, 테마) 정보
 */
type ChannelArt = {
  /** 방송국 고유 번호 */
  station_no: number;
  /** PC용 채널 아트 이미지 URL */
  pc_url: string;
  /** 채널 테마 색상 (hex 코드) */
  color: string;
  /** 초기 설정 여부 */
  is_init: boolean;
  /** 채널에서 사용되는 색상 팔레트 (hex 코드 배열) */
  palettes: string[];
};

type StationBjRequest = {
  user_id: string;
};

/**
 * 방송국 BJ 정보 메인 인터페이스
 */
type StationBjResponse = {
  /** BJ가 보유한 메달 목록 */
  medals: Medal[];
  /** BJ의 소셜 미디어 링크 목록 */
  links: SocialLink[];
  /** 방송국 채널 아트 정보 */
  channelart: ChannelArt;
};

export type {
  ChannelArt,
  Medal,
  SocialLink,
  StationBjRequest,
  StationBjResponse,
};
