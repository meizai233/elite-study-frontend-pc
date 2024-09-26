/**
 * github第三方登录
 */

export async function getGitHubOauth() {
  const runtimeConfig = useRuntimeConfig();
  const client_id = runtimeConfig.public.client_id;

  const redirect_uri = `http://localhost:8888/api/github_login/v1/redirect`;
  const authorize_uri = "https://github.com/login/oauth/authorize";

  const link = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;

  return link;
}
