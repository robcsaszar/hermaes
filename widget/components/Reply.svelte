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
      alert(t('comments_comment_error_required'))
      return
    }

    if (!nickname) {
      alert(t('comments_display_name_error_required'))
      return
    }

    if (email && !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)) {
      alert(t('comments_email_note_email_not_correct_format'))
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
      setMessage(t('comments_submit_success'))
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

<form class="flex flex-col gap-4">
  <fieldset class="flex gap-4 flex-wrap">
    <label class="flex flex-col gap-1">
      <span>{t('comments_display_name_label')}</span>
      <input
        required
        name="nickname"
        class="rounded-md w-full bg-white px-2 py-1 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
        type="text"
        placeholder={t('comments_display_name_placeholder')}
        bind:value={nickname}
      />
    </label>
    <label class="flex flex-col gap-1">
      <span>{t('comments_email_label')}</span>
      <input
        name="email"
        class="rounded-md w-full bg-white px-2 py-1 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
        type="email"
        placeholder={t('comments_email_placeholder')}
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        bind:value={email}
      />
      <span class="text-sm text-ebony-300 flex gap-1 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
        {t('comments_email_note_optional_not_published')}
      </span>
    </label>
  </fieldset>

  <fieldset>
    <label class="flex flex-col gap-1">
      <span>{t('comments_comment_label')}</span>
      <textarea
        required
        name="reply_content"
        rows="4"
        autocorrect="off"
        spellcheck="false"
        class="rounded-md w-full bg-white px-2 py-1 text-ebony-300 outline-none ring-2 ring-wheatfield-400 transition-shadow duration-300 placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 focus:ring-wheatfield-600 focus:placeholder:opacity-0"
        placeholder={t('comments_comment_placeholder')}
        bind:value={content}
      />
    </label>
  </fieldset>

    <button
      class="rounded-md bg-ebony py-2 px-4 font-semibold text-wheatfield-50 disabled:cursor-not-allowed disabled:opacity-50 self-start"
      disabled={loading}
      type="submit"
      on:click={addComment}>
      <span class="flex gap-2 items-end">
        {loading ? t('comments_sending_comment') : t('comments_submit_button')}
        {#if loading}
          {@html loader()}
        {/if}
      </span>
    </button>
</form>
