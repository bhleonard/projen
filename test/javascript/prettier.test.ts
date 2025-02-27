import { SourceCode } from "../../src";
import { ArrowParens, NodeProject, TrailingComma } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("prettier", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: { settings: { printWidth: 140 } },
    });

    // THEN
    expect(synthSnapshot(project)[".prettierrc.json"]).toMatchSnapshot();
  });

  test("snapshot with ignore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: { settings: { printWidth: 140 } },
    });

    project.prettier?.ignoreFile?.addPatterns("build");

    // THEN
    expect(synthSnapshot(project)[".prettierignore"]).toMatchSnapshot();
  });

  test("sample config is created", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: {
        settings: {
          trailingComma: TrailingComma.ALL,
          bracketSpacing: true,
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          arrowParens: ArrowParens.ALWAYS,
          printWidth: 140,
          useTabs: false,
          parser: "typescript",
        },
      },
    });

    // THEN
    expect(project.prettier?.settings).toMatchObject({
      trailingComma: "all",
      bracketSpacing: true,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      arrowParens: "always",
      printWidth: 140,
      useTabs: false,
      parser: "typescript",
    });
  });

  test("snapshot with ignore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });
    new SourceCode(project, "src/example.ts");

    // THEN
    expect(synthSnapshot(project)[".prettierignore"]).toMatchSnapshot();
  });
});
