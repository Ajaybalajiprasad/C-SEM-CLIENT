import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const githubToken = Buffer.from(process.env.GITHUB_TOKEN as string, 'base64').toString('utf-8');
const octokit = new Octokit({
  auth: githubToken,
});

const repoOwner = 'Ajaybalajiprasad';
const repoName = 'CodeSnippets';
const folderPath = 'snippets';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await octokit.repos.getContent({
      owner: repoOwner,
      repo: repoName,
      path: folderPath,
    });

    const snippets = await Promise.all(
      (response.data as any[]).map(async (item) => {
        const contentResponse = await octokit.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: item.path,
        });

        const content = Buffer.from((contentResponse.data as any).content, 'base64').toString('utf-8');

        return { name: item.name, content };
      })
    );

    res.status(200).json(snippets);
  } catch (error: any) {
    console.error('Error fetching snippets:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { title, code, language } = req.body;

  if (!title || !code || !language) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = `${folderPath}/${title.replace(/\s+/g, '_')}.${language.toLowerCase()}`;

  try {
    let sha: string | undefined = undefined;
    try {
      const getFile = await octokit.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
      });
      sha = (getFile.data as any).sha;
    } catch (err) {
      console.log('File does not exist, creating a new file', err);
    }

    // Create or update the file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: `Add snippet: ${title}`,
      content: Buffer.from(code).toString('base64'),
      sha,
    });

    res.status(200).json({ message: 'Snippet added successfully', data: response.data });
  } catch (error: any) {
    console.error('Error adding snippet:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}