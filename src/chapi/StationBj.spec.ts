import { buildClient } from "fetch-chain";
import { ApiService } from "../ApiService";
import { HttpClient } from "../HttpClient";
import { StationBjOperation } from "./StationBj";
import { Chain } from "fetch-chain";

describe("StationBj API", () => {
  let httpClient: HttpClient;
  let apiService: ApiService;

  beforeAll(() => {
    httpClient = {
      fetch: (request: RequestInfo | URL, init?: RequestInit) =>
        buildClient()
          .baseURL("https://chapi.sooplive.co.kr")
          .addInterceptor((chain: Chain) => {
            const request = chain.request();
            const init = chain.init() ?? {};
            const newInit = {
              ...init,
              headers: {
                ...init.headers,
                "User-Agent": "Mozilla/5.0 FetchChain/0.0.3",
              },
            };
            return chain.proceed(request, newInit);
          })
          .build()
          .fetch(request, init),
    };
    apiService = new ApiService(httpClient);
  });

  it("BJ 방송국 정보를 정상적으로 가져와야 합니다", async () => {
    const stationBjOperation =
      apiService["createOperation"](StationBjOperation);
    const result = await stationBjOperation({ user_id: "rud9281" });
    console.log(result);
    // 기본 응답 구조 검증
    expect(result).toHaveProperty("medals");
    expect(result).toHaveProperty("links");
    expect(result).toHaveProperty("channelart");

    // medals 배열 검증
    expect(Array.isArray(result.medals)).toBe(true);
    if (result.medals.length > 0) {
      const medal = result.medals[0];
      expect(medal).toHaveProperty("id");
      expect(medal).toHaveProperty("key");
      expect(medal).toHaveProperty("name");
      expect(medal).toHaveProperty("description");
    }

    // links 배열 검증
    expect(Array.isArray(result.links)).toBe(true);
    if (result.links.length > 0) {
      const link = result.links[0];
      expect(link).toHaveProperty("no");
      expect(link).toHaveProperty("type");
      expect(link).toHaveProperty("link_name");
      expect(link).toHaveProperty("code");
      expect(link).toHaveProperty("image");
      expect(link).toHaveProperty("url");
      expect(typeof link.no).toBe("number");
      expect(typeof link.type).toBe("number");
    }

    // channelart 객체 검증
    const { channelart } = result;
    expect(channelart).toHaveProperty("station_no");
    expect(channelart).toHaveProperty("pc_url");
    expect(channelart).toHaveProperty("color");
    expect(channelart).toHaveProperty("is_init");
    expect(channelart).toHaveProperty("palettes");

    expect(typeof channelart.station_no).toBe("number");
    expect(typeof channelart.is_init).toBe("boolean");
    expect(Array.isArray(channelart.palettes)).toBe(true);
  });
});
