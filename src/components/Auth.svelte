<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../plugins/Request.js";
  import * as CookiePlugin from "../plugins/Cookie.js";

  const requestPlugin = RequestPlugin.getInstance();

  onMount(async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const res = await requestPlugin.get(`/authenticate?code=${code}`);
    if (res.status === 200) {
      const access_token = res.data.access_token;
      CookiePlugin.set("access_token", access_token);
      window.close();
    }
    Alert("Une erreur est survenue lors de l'authentification");
  });
</script>
