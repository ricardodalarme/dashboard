export type TTestDetails = {
  architecture: string;
  build_id: string;
  compiler: string;
  config_name: string;
  environment_misc: Record<string, string> | undefined;
  git_commit_hash: string;
  git_repository_branch: string;
  git_repository_url: string;
  id: string;
  log_excerpt: string | undefined;
  log_url: string | undefined;
  misc: Record<string, string> | undefined;
  path: string;
  start_time: string;
  status: string;
};
