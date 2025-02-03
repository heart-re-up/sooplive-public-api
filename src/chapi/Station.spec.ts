import { describe, it, expect, beforeAll } from "vitest";
import { buildClient } from "fetch-chain";
import { ApiService, SimpleApiService } from "../ApiService";
import { HttpClient } from "../HttpClient";
import { StationOperation } from "./Station";
import { Chain } from "fetch-chain";

describe("Station API", () => {
  let httpClient: HttpClient;
  let apiService: ApiService;

  beforeAll(() => {
    httpClient = {
      fetch: (
        request: RequestInfo | URL,
        init?: RequestInit,
      ): Promise<Response> =>
        buildClient()
          .baseURL("https://chapi.sooplive.co.kr")
          .addInterceptor((chain: Chain) => {
            const request = chain.request();
            const init = chain.init() ?? {};
            const newInit = {
              ...init,
              headers: {
                ...init.headers,
                // Origin: "https://ch.sooplive.co.kr",
                // Referer: "https://ch.sooplive.co.kr/rud9281",
                // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36
                "User-Agent": "Mozilla/5.0 FetchChain/0.0.3",
              },
            };
            return chain.proceed(request, newInit);
          })
          .build()
          .fetch(request, init),
    };
    apiService = new SimpleApiService(httpClient);
  });
  it("방송국 정보를 정상적으로 가져와야 합니다", async () => {
    const stationOperation = apiService.createOperation(StationOperation);
    const result = await stationOperation({ user_id: "rud9281" });

    // 기본 응답 구조 검증
    expect(result).toHaveProperty("profile_image");
    expect(result).toHaveProperty("station");
    expect(result).toHaveProperty("broad");
    expect(result).toHaveProperty("subscription");

    // station 객체 검증
    const { station } = result;
    expect(station).toHaveProperty("display");
    expect(station).toHaveProperty("groups");
    expect(station).toHaveProperty("menus");
    expect(station).toHaveProperty("broad_start");
    expect(station).toHaveProperty("grade");
    expect(station).toHaveProperty("jointime");
    expect(station).toHaveProperty("station_name");
    expect(station).toHaveProperty("station_no");
    expect(station).toHaveProperty("station_title");
    expect(station).toHaveProperty("total_broad_time");
    expect(station).toHaveProperty("user_id");
    expect(station).toHaveProperty("user_nick");

    // 중요한 숫자 필드 타입 검증
    expect(typeof station.station_no).toBe("number");

    // display 객체 검증
    const { display } = station;
    expect(display).toHaveProperty("main_type");
    expect(display).toHaveProperty("title_type");
    expect(display).toHaveProperty("title_text");
    expect(display).toHaveProperty("profile_text");
    expect(display).toHaveProperty("skin_type");
    expect(display).toHaveProperty("skin_no");

    // broad 객체 검증 (broad가 존재할 경우에만)
    if (result.broad) {
      const { broad } = result;
      expect(broad).toHaveProperty("user_id");
      expect(broad).toHaveProperty("broad_no");
      expect(broad).toHaveProperty("broad_title");
      expect(broad).toHaveProperty("current_sum_viewer");
      expect(broad).toHaveProperty("broad_grade");
      expect(broad).toHaveProperty("is_password");

      // 중요한 숫자/불리언 필드 타입 검증
      expect(typeof broad.current_sum_viewer).toBe("number");
      expect(typeof broad.is_password).toBe("boolean");
    }

    // subscription 객체 검증
    const { subscription } = result;
    expect(subscription).toHaveProperty("total");
    expect(subscription).toHaveProperty("tier1");
    expect(subscription).toHaveProperty("tier2");

    // 중요한 숫자 필드 타입 검증
    expect(typeof subscription.total).toBe("number");
    expect(typeof subscription.tier1).toBe("number");
    expect(typeof subscription.tier2).toBe("number");
  });
});
