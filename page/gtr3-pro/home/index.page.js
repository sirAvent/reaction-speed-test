// import { TEXT_STYLE } from './index.style'
import { gettext } from "i18n"

const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()
hmUI.setStatusBarVisible(false)

let rounds = 0
var green = false
var reactionTime = 0
var clicked = false
var timeSum = 0
var early = false
var timers = []
var startTime = 0
var timing = false

function countdown(background, title) {
  const delay = Math.floor((Math.random() * 2500) + 500)
  delayed = false
  const timerDown = timer.createTimer(
    1,
    delay,
    function () {
      logger.log('CALL ONCE ONLY', early.toString())
      if (!delayed) {delayed = true}
      else if (!early){
        green = true
        go(background, title)
        timing = true
        startTime = Date.now()
        timer.stopTimer(timerDown)
      }
      else {timer.stopTimer(timerDown)}
    }
  )
  try {timer.stopTimer(timers[0])} catch (error) {}
  timers[0] = timerDown
}

function wait(background, img, title) {
  background.setProperty(hmUI.prop.MORE, {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0xCE2636
  })

  img.setProperty(hmUI.prop.MORE, {
    x: (DEVICE_WIDTH - 111)/2,
    y: px(128),
    w: (111),
    h: (30),
    src: 'bars.png',
  })

  title.setProperty(hmUI.prop.MORE, {
    x: px(25),
    y: DEVICE_HEIGHT/2 - px(82/2),
    w: px(431),
    h: px(83),
    color: 0xffffff,
    text_size: px(64),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('wait')
  })
}

function go(background, title) {
  title.setProperty(hmUI.prop.MORE, {
    x: 0,
    y: DEVICE_HEIGHT/2 - px(77/2),
    w: DEVICE_WIDTH,
    h: px(77),
    color: 0xFFFFFF,
    text_size: px(64),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('click')
  })
  
  background.setProperty(hmUI.prop.MORE, {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0x4BDB6A
  })  
}

function result(background, img, title, txt, valid) {
  try {timer.stopTimer(timerDown)} catch (error) {}
  txt.setProperty(hmUI.prop.VISIBLE, true)
  background.setProperty(hmUI.prop.MORE, {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0x448AFF
  })
  if (valid) {  
    img.setProperty(hmUI.prop.MORE, {
      x: (DEVICE_WIDTH - 111)/2,
      y: px(87),
      w: (111),
      h: (111),
      src: 'time.png',
    })
  
    stringTime = Math.floor(reactionTime).toString()
    title.setProperty(hmUI.prop.MORE, {
      x: px(0),
      y: (DEVICE_HEIGHT/2) - px(77/2),
      w: DEVICE_WIDTH,
      h: px(77),
      color: 0xffffff,
      text_size: px(64),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: (stringTime + ' ms')
    })

    txt.setProperty(hmUI.prop.MORE, {
      x: px(0),
      y: (DEVICE_HEIGHT/2) + px(77/2),
      w: DEVICE_WIDTH,
      h: px(52),
      color: 0xffffff,
      text_size: px(40),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: gettext('continue')
    })
  }
  else {
    img.setProperty(hmUI.prop.MORE, {
      x: (DEVICE_WIDTH - 111)/2,
      y: px(87),
      w: (111),
      h: (111),
      src: 'alert.png',
    })
  
    title.setProperty(hmUI.prop.MORE, {
      x: px(0),
      y: DEVICE_HEIGHT/2 - px(77/2),
      w: DEVICE_WIDTH,
      h: px(77),
      color: 0xffffff,
      text_size: px(64),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: gettext('early')
    })

    txt.setProperty(hmUI.prop.MORE, {
      x: px(0),
      y: DEVICE_HEIGHT/2 + px(77/2),
      w: DEVICE_WIDTH,
      h: px(52),
      color: 0xffffff,
      text_size: px(40),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: gettext('again')
    })
  }
}


function final(background, img, title, txt) {
  txt.setProperty(hmUI.prop.VISIBLE, true)
  background.setProperty(hmUI.prop.MORE, {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0x448AFF
  })

  img.setProperty(hmUI.prop.MORE, {
    x: (DEVICE_WIDTH-113)/2,
    y: px(57),
    w: (113),
    h: (134),
    src: 'lightning.png',
  })

  avg = (Math.floor(timeSum/5)).toString()
  title.setProperty(hmUI.prop.MORE, {
    x: px(0),
    y: (249),
    w: DEVICE_WIDTH,
    h: px(77),
    color: 0xffffff,
    text_size: px(64),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: (avg + ' ms')
  })

  txt.setProperty(hmUI.prop.MORE, {
    x: px(0),
    y: (201),
    w: DEVICE_WIDTH,
    h: px(53),
    color: 0xffffff,
    text_size: px(40),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('avg')
  })

  hmUI.createWidget(hmUI.widget.BUTTON, {
    x: px(250)/2,
    y: (347),
    text: gettext('again'),
    w: px(250),
    h: px(60),
    radius: px(30),
    text_size: px(32),
    color: 0x000000,
    normal_color: 0xFDEC3C,
    press_color: 0xFDEC3C,
    click_func: () => {
      gameStart()
    }
  })
}

function gameStart() {
  const bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: 0,
    y: 0,
    w: DEVICE_WIDTH,
    h: DEVICE_HEIGHT,
    color: 0x448AFF
  })

  const icon = hmUI.createWidget(hmUI.widget.IMG, {
    x: px(191),
    y: px(32),
    w: (113),
    h: (134),
    src: 'lightning.png',
  })

  const big_text = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 0,
    y: (166),
    w: DEVICE_WIDTH,
    h: px(49),
    color: 0xffffff,
    text_size: px(48),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('title')
  })

  const small_text = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 0,
    y: (237),
    w: DEVICE_WIDTH,
    h: px(40),
    color: 0xffffff,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('desc1')
  })

  const small_text2 = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 0,
    y: (276),
    w: DEVICE_WIDTH,
    h: px(40),
    color: 0xffffff,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: gettext('desc2')
  })

  const start_btn = hmUI.createWidget(hmUI.widget.BUTTON, {
    x: px(150),
    y: (357),
    text: gettext('begin'),
    w: px(200),
    h: px(60),
    radius: px(30),
    text_size: px(32),
    color: 0x000000,
    normal_color: 0xFDEC3C,
    press_color: 0xFDEC3C,
    click_func: () => {
      const press_box = hmUI.createWidget(hmUI.widget.IMG, {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT,
        src: 'transparent.png',
      })
      press_box.addEventListener(hmUI.event.CLICK_DOWN, function(){
        logger.log(green, early)
        if (timing) {
          reactionTime = Date.now() - startTime
          timeSum += reactionTime
          rounds++
          if (rounds === 5) {
            press_box.setProperty(hmUI.prop.VISIBLE, false)
            rounds = 0
            green = false
            early = false
            startTime = 0
            timing = false
            final(bg,icon,big_text,small_text)
            delayed = false
            reactionTime = 0
            clicked = false
            timeSum = 0
          }
          else {
            result(bg, icon, big_text, small_text, true)
            timing = false
            logger.log('early1')
            early = true
            green = false
          }
        }
        else if (green) {
          clicked = true
        }
        else if (early) {   
          small_text.setProperty(hmUI.prop.VISIBLE, false)
          wait(bg, icon, big_text)
          early = false
          countdown(bg, big_text)
        }
        else {
          logger.log('early2')
          early = true
          result(bg, icon, big_text, small_text, false)
          try {timer.stopTimer(timerDown)} catch (error) {}
        }
      })
      wait(bg, icon, big_text)
      countdown(bg, big_text)
      small_text.setProperty(hmUI.prop.VISIBLE, false)
      small_text2.setProperty(hmUI.prop.VISIBLE, false)
      start_btn.setProperty(hmUI.prop.VISIBLE, false)
    }
  })
}

Page({
  build() {
    logger.debug('page build invoked')
    gameStart()
  },
  onInit() {
    logger.debug('page onInit invoked')
  },

  onDestroy() {
    logger.debug('page onDestroy invoked')
    try {timer.stopTimer(timerDown)} catch (error) {}
  },
})