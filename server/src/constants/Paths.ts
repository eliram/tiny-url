/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Urls: {
    Base: '/urls',
    Get: '/',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  TinyUrl: {
    Base: '/tiny',
    Get:'/:id',
  },
} as const;
