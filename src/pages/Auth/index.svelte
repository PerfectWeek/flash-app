<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../../plugins/Request.js";
  import * as CookiePlugin from "../../plugins/Cookie.js";

  onMount(async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const res = await RequestPlugin.sendCode(code);
    if (res.status === 200) {
      const access_token = res.data.access_token;
      CookiePlugin.set("access_token", access_token);
      window.close();
    } else {
      console.error(res.statusText);
    }
  });
</script>
