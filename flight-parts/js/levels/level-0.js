'use strict';

levels[0] = {
  'background': [
    /*
    new Grid({
      'x': 0,
      'y': 250,
      'z': -5,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': Infinity,
    }),
    new Grid({
      'x': 500,
      'y': 250,
      'z': -5,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': Infinity,
    }),
    new Grid({
      'x': 1000,
      'y': 250,
      'z': -5,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': Infinity,
    }),
    new Grid({
      'x': 1500,
      'y': 250,
      'z': -5,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': Infinity,
    }),
    new Grid({
      'x': 2000,
      'y': 250,
      'z': -5,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': Infinity,
    }),
    */
    new Grid({
      'x': 0,
      'y': 250,
      'z': 0,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': 500,
    }),
    new Grid({
      'x': 500,
      'y': 250,
      'z': 0,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': 1000,
    }),
    new Grid({
      'x': 1000,
      'y': 250,
      'z': 0,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': 1500,
    }),
    new Grid({
      'x': 1500,
      'y': 250,
      'z': 0,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': 2000,
    }),
    new Grid({
      'x': 2000,
      'y': 250,
      'z': 0,
      'width': 500,
      'height': 500,
      'regionStart': 0,
      'regionEnd': 2500,
    }),

  ],
  'enemies': [
    /* new Enemy({
      'x': 1000,
      'y': 200,
      'width': 30,
      'height': 30,
      'regionStart': 0,
      'regionEnd': 1200,
    }),
    new Bee({
      'x': 1000,
      'y': 250,
      'width': 30,
      'height': 30,
      'regionStart': 50,
      'regionEnd': 1250,
    }), */
    new Hornet({
      'x': 1000,
      'y': 300,
      'width': 30,
      'height': 30,
      'regionStart': 100,
      'regionEnd': 5000,
    }),
  ],
  'flames': [],
  'fireballs': [],
  'items': [],
  'foreground': [],
};
