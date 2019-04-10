import VueRouter from 'vue-router';

import Posts from '@/components/Posts';
import Post from '@/components/Post';

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts,
    },
    {
      path: '/:post_url',
      name: 'Post',
      component: Post,
    },
  ],
});

