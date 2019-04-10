<template>
  <div>
    <h2>{{ post.name }}</h2>
    <p class="post-signature"><em>{{ post.author }} &mdash; {{ post.pretty_date }}</em></p>
    <pre class="post-intro" v-html="post.intro"></pre>
    <img v-bind:src="post.image_url" width="100%">
    <pre v-html="post.content"></pre>
  </div>
</template>

<style>
  .post-signature {
    margin-top: 4px;
  }

  .post-intro {
    margin: 16px 0;
  }

  pre {
    font-size: 16px;
    text-align: justify;
    line-height: 20px;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  pre p {
    margin-top: 16px;
  }
</style>

<script>
  import firebase from '../Firebase';
  import router from '../router';

  export default {
    name: 'Post',
    data() {
      return  {
        post: {},
        db: firebase.database(),
      };
    },
    created() {
      var url = this.$route.params.post_url;
      this.db.ref('/post/' + url).on('value', post_snapshot => {
        this.post = post_snapshot.val();

        this.post.pretty_date = this.post.date.day_of_week + ', ' +
          this.post.date.date + ' ' +
          this.post.date.month + ' ' +
          this.post.date.year + ' ' +
          this.post.date.hour + ':' +
          (this.post.date.minute < 10 ? '0' : '') + this.post.date.minute + ' ' +
          this.post.date.meridian;

        this.db.ref('/author/' + this.post.author_id).on('value', author_snapshot => {
          var author = author_snapshot.val();
          this.post.author = author.first_name + ' ' + author.last_name;
        });
      });
    },
  }
</script>

