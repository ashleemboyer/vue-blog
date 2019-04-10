<template>
  <div>
    <div v-for="post in posts" v-on:click=openPost(post) class="post-card">
      <h2 class="post-title">{{ post.name }}</h2>
      <p class="post-signature"><em>{{ post.author }} &mdash; {{ post.pretty_date }}</em></p>
      <pre class="post-intro">{{ post.intro }}</pre>
      <img v-bind:src="post.image_url" width="100%">
      <pre v-html="post.content" class="post-content"></pre>
    </div>
  </div>
</template>

<style>
  .post-card {
    border: 1px solid grey;
    border-radius: 2px;
    margin: 24px 0;
    padding: 12px 0;
  }

  .post-card:hover {
    cursor: pointer;
    box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.25);
    -webkit-box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.25);
    -moz-box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.25);
  }

  .post-card .post-title,
  .post-card .post-signature,
  .post-card .post-intro,
  .post-card .post-content {
    margin: 0 12px;
  }

  .post-card .post-signature {
    margin-top: 4px;
  }

  .post-card .post-intro, .post-card post.content {
    font-size: 16px;
  }

  .post-card .post-intro {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .post-card pre {
    text-align: justify;
    line-height: 20px;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .post-card .post-content p {
    margin-top: 16px;
  }
</style>

<script>
  import firebase from '../Firebase';
  import router from '../router';

  export default {
    name: 'Posts',
    data() {
      return {
        posts: [],
        authors: {},
        ref: firebase.database().ref('/'),
      };
    },
    created() {
      this.ref.on('value', snapshot => {
        var val = snapshot.val();
        this.authors = val.author;

        for (var post_url in val.post) {
          var post = val.post[post_url];

          var author = this.authors[post.author_id];
          post.author = author.first_name + ' ' + author.last_name;

          post.pretty_date = post.date.day_of_week + ', ' +
            post.date.date + ' ' +
            post.date.month + ' ' +
            post.date.year + ' ' +
            post.date.hour + ':' +
            (post.date.minute < 10 ? '0' : '') + post.date.minute + ' ' +
            post.date.meridian;

          this.posts.push(post);
        }

        this.posts.sort((a, b) => {
          var a_date = new Date(a.pretty_date);
          var b_date = new Date(b.pretty_date);

          return b_date.getTime() - a_date.getTime();
        });
      });
    },
    methods: {
      openPost(post) {
        router.push({
          name: 'Post',
          params: { post_url: post.url }
        });
      },
    },
  };
</script>

