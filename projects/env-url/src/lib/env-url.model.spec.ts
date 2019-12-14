import { Environment, EnvUrl } from "./env-url.model";

const mockLocalClient = "http://localhost:8080/feature";
const mockDevelopmentClient =
  "https://my-domain.dev.my-development-instance.com/feature";
const mockStageClient =
  "https://my-domain.stg.my-development-instance.com/feature";
const mockProductionClient =
  "https://my-domain.prod.my-development-instance.com/feature";

describe("EnvUrl", () => {
  const envPlaceholder = "{env}";
  const urlTemplate =
    "https://my-api-domain." + envPlaceholder + ".my-app.com/v1/route";

  it("should generate a production Url for a production client", () => {
    const environment = new Environment({
      location: { href: mockProductionClient }
    } as Window);
    const envUrl = new EnvUrl(envPlaceholder, urlTemplate, environment);

    expect(envUrl.url).toEqual("https://my-api-domain.my-app.com/v1/route");
  });

  it("should generate a stage Url for a stage client", () => {
    const environment = new Environment({
      location: { href: mockStageClient }
    } as Window);
    const envUrl = new EnvUrl(envPlaceholder, urlTemplate, environment);

    expect(envUrl.url).toEqual("https://my-api-domain.stg.my-app.com/v1/route");
  });

  it("should generate a production Url for a development client", () => {
    const environment = new Environment({
      location: { href: mockDevelopmentClient }
    } as Window);
    const envUrl = new EnvUrl(envPlaceholder, urlTemplate, environment);

    expect(envUrl.url).toEqual("https://my-api-domain.dev.my-app.com/v1/route");
  });

  it("should generate a development Url for a local client", () => {
    const environment = new Environment({
      location: { href: mockLocalClient }
    } as Window);
    const envUrl = new EnvUrl(envPlaceholder, urlTemplate, environment);

    expect(envUrl.url).toEqual("https://my-api-domain.dev.my-app.com/v1/route");
  });

  it("should generate a local Url for a local client if port provided", () => {
    const environment = new Environment({
      location: { href: mockLocalClient }
    } as Window);
    const envUrl = new EnvUrl(envPlaceholder, urlTemplate, environment, "8080");

    expect(envUrl.url).toEqual("http://localhost:8080/v1/route");
  });
});
