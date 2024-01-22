<script>
  import { getContext } from 'svelte'
  import { t } from '../i18n'
  export let parentId

  // form data
  let content = ''
  let nickname = ''
  let email = ''

  let loading = false

  export let onSuccess

  const api = getContext('api')
  const setMessage = getContext('setMessage')
  const { appId, pageId, pageUrl, pageTitle } = getContext('attrs')
  const refresh = getContext('refresh')

  async function addComment() {
    if (!content) {
      alert(t('content_is_required'))
      return
    }

    if (!nickname) {
      alert(t('nickname_is_required'))
      return
    }

    try {
      loading = true
      const res = await api.post('/api/open/comments', {
        appId,
        pageId,
        content,
        nickname,
        email,
        parentId,
        pageUrl,
        pageTitle,
      })
      await refresh()
      teardown()
      setMessage(t('comment_has_been_sent'))
    } finally {
      loading = false
    }
  }

  function teardown() {
    content = ''
    nickname = ''
    email = ''
    onSuccess && onSuccess()
  }

  function loader() {
    return `<div class="leap-frog"><div class="leap-frog__dot"></div><div class="leap-frog__dot"></div><div class="leap-frog__dot"></div></div>`
  }

</script>

<div class="flex flex-col gap-4">
  <div class="flex gap-4 flex-wrap">
    <label class="flex flex-col gap-1">
      <span>{t('nickname')}</span>
      <input
        required
        name="nickname"
        class="rounded-md w-full bg-white p-2 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
        type="text"
        title={t('nickname')}
        bind:value={nickname}
      />
    </label>
    <label class="flex flex-col gap-1">
      <span>{t('email')}</span>
      <input
        name="email"
        class="rounded-md w-full bg-white p-2 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
        type="email"
        title={t('email')}
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        bind:value={email}
      />
    </label>
  </div>

  <label class="flex flex-col gap-1">
    <span>{t('reply_placeholder')}</span>
    <textarea
      required
      name="reply_content"
      rows="4"
      autocorrect="off"
      spellcheck="false"
      class="rounded-md w-full bg-white p-2 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
      title={t('reply_placeholder')}
      bind:value={content}
    />
  </label>

    <button
      class="rounded-md bg-ebony py-2 px-4 font-semibold text-wheatfield-50 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={loading}
      on:click={addComment}>
      <span>
        {loading ? t('sending') : t('comments_submit_button')}
        {#if loading}
          {@html loader()}
        {/if}
      </span>
    </button>
</div>
