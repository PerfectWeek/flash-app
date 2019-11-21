<script>
  export let members;
  export let userName;
</script>

<style>
  .members-list {
    margin-top: 0;
    list-style-type: none;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.25px;
  }

  .member {
    display: flex;
    align-items: center;
  }

  .name {
    vertical-align: middle;
    font-size: 1.1em;
  }

  .picture {
    height: 1.5em;
    border-radius: 50px;
    margin-right: 1vw;
  }

  .user {
    font-weight: bold;
  }
</style>

<ul class="members-list">
  {#each members as member}
    <li class="member">
      <img src={member.picture} class="picture" alt="pic" />
      <div class={member.name === userName ? 'name user' : 'name'}>
        {member.name}
      </div>
    </li>
  {/each}
</ul>
