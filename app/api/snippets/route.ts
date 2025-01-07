import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables");
}
const octokit = new Octokit({
  auth: githubToken,
});
const repoOwner = "Ajaybalajiprasad";
const repoName = "C-SEM";
const folderPath = "codes";

export async function GET() {
  try {
    const response = await octokit.repos.getContent({
      owner: repoOwner,
      repo: repoName,
      path: folderPath,
    });
    if (!Array.isArray(response.data)) {
      return NextResponse.json(
        { error: "Snippets folder not found" },
        { status: 404 }
      );
    }
    const snippets = await Promise.all(
      (response.data as any[]).map(async (item) => {
        const contentResponse = await octokit.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: item.path,
        });
        const content = Buffer.from(
          (contentResponse.data as any).content,
          "base64"
        ).toString("utf-8");
        return { id: item.name, content };
      })
    );
    return NextResponse.json(snippets);
  } catch (error: any) {
    console.error("Error fetching snippets:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, code, language } = await request.json();
    if (!title || !code || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const filePath = `${folderPath}/${title.replace(
      /\s+/g,
      "_"
    )}.${language.toLowerCase()}`;
    let sha: string | undefined = undefined;
    try {
      const getFile = await octokit.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
      });
      sha = (getFile.data as any).sha;
    } catch (err) {
      // File does not exist, proceed to create
    }
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: `Add snippet: ${title}`,
      content: Buffer.from(code).toString("base64"),
      sha,
    });
    return NextResponse.json(
      { message: "Snippet added successfully", data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding snippet:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
