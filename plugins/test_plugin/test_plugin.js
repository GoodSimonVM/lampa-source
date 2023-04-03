// import Lampa from '../src/app.js'

const authorId = "gsvm";
const pluginName = "test_plugin";

const pluginId = `${authorId}_${pluginName}`;
const pluginComponentId = `${pluginId}_component`;

const key_pluginStorage_actualPassword = `${pluginId}_storage_actual_password`;

const defaultPassword = "Qwerty12";
const minPasswordLength = 4;

const pluginTitleKey = `${pluginId}_title`;
const pluginIcon = `<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/>
  <rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/>
</svg>`;

const key_pluginParam = `${pluginId}_param`;

const key_pluginParam_adultAccessMode = `${key_pluginParam}_adultAccessMode`;
const key_pluginParam_adultAccessMode_title = `${key_pluginParam_adultAccessMode}_title`;
const key_pluginParam_adultAccessMode_free = `${key_pluginParam_adultAccessMode}_free`;
const key_pluginParam_adultAccessMode_pass = `${key_pluginParam_adultAccessMode}_pass`;
const key_pluginParam_adultAccessMode_god = `${key_pluginParam_adultAccessMode}_god`;

const key_pluginParam_changePassword = `${key_pluginParam}_password`;
const key_pluginParam_changePassword_sectionTitle = `${key_pluginParam_changePassword}_title`;
const key_pluginParam_changePassword_old = `${key_pluginParam_changePassword}_old`;
const key_pluginParam_changePassword_old_title = `${key_pluginParam_changePassword_old}_title`;
const key_pluginParam_changePassword_new = `${key_pluginParam_changePassword}_new`;
const key_pluginParam_changePassword_new_title = `${key_pluginParam_changePassword_new}_title`;
const key_pluginParam_changePassword_btn = `${key_pluginParam_changePassword}_btn`;
const key_pluginParam_changePassword_btn_title = `${key_pluginParam_changePassword_btn}_title`;
const key_pluginParam_changePassword_notify_invalidOldPassword = `${key_pluginParam_changePassword}_notify_invalidOldPassword`;
const key_pluginParam_changePassword_notify_invalidNewPassword = `${key_pluginParam_changePassword}_notify_invalidNewPassword`;
const key_pluginParam_changePassword_notify_passwordChanged = `${key_pluginParam_changePassword}_notify_passwordChanged`;

const hiddenPassword = "********";

// Защитп на случай если нет перевода
if (!Lampa.Lang) {
  let lang_data = {};

  Lampa.Lang = {
    add: (data) => {
      lang_data = data;
    },
    translate: (key) => {
      return lang_data[key] ? lang_data[key].ru : key;
    },
  };
}

// добавляем переводы строк
Lampa.Lang.add({
  [pluginTitleKey]: {
    ru: "Тестовый плагин",
    en: "Test plugin",
  },
  // режимы доступа
  [key_pluginParam_adultAccessMode_title]: {
    ru: "Доступ к 18+:",
    en: "Adult content access mode:",
  },
  [key_pluginParam_adultAccessMode_free]: {
    ru: "Без защиты",
    en: "Free access",
  },
  [key_pluginParam_adultAccessMode_pass]: {
    ru: "По паролю",
    en: "Use password",
  },
  [key_pluginParam_adultAccessMode_god]: {
    ru: "Через режим бога",
    en: "Use god-mode",
  },
  // смена пароля
  [key_pluginParam_changePassword_sectionTitle]: {
    ru: "Смена пароля",
    en: "Change password",
  },
  [key_pluginParam_changePassword_old_title]: {
    ru: "Введите старый пароль:",
    en: "Enter old password:",
  },
  [key_pluginParam_changePassword_new_title]: {
    ru: "Введите новый пароль:",
    en: "Enter new password:",
  },
  [key_pluginParam_changePassword_btn_title]: {
    ru: "Сменить",
    en: "Change",
  },
  [key_pluginParam_changePassword_notify_invalidOldPassword]: {
    ru: "Неверный старый пароль",
    en: "Invalid old password",
  },
  [key_pluginParam_changePassword_notify_invalidOldPassword]: {
    ru: `Неверный новый пароль.\n Пароль должен быть длинной больше ${minPasswordLength} символов`,
    en: `Invalid new password. A password must be: length >= ${minPasswordLength}`,
  },
  [key_pluginParam_changePassword_notify_passwordChanged]: {
    ru: "Пароль изменён",
    en: "Password changed",
  },
});

let enteredOldPassword = "";
let enteredNewPassword = "";

class Component {
  constructor(object) {
    this.create = function () {
      this.activity.loader(true);
    };
  }
}

function addMainMenuActivity() {
  let button = $(
    Lampa.Lang.translate(
      `<li class="menu__item selector">
        <div class="menu__ico">
          <svg width="129.895654296875px" height="122px" xmlns="http://www.w3.org/2000/svg"
            viewBox="185.0521728515625 14 129.895654296875 122" style="background: rgba(0, 0, 0, 0);"
            preserveAspectRatio="xMidYMid">
            <defs>
              <filter id="editing-hole" x="-100%" y="-100%" width="300%" height="300%">
                <feFlood flood-color="#000" result="black"></feFlood>
                <feMorphology operator="dilate" radius="2" in="SourceGraphic" result="erode"></feMorphology>
                <feGaussianBlur in="erode" stdDeviation="4" result="blur"></feGaussianBlur>
                <feOffset in="blur" dx="2" dy="2" result="offset"></feOffset>
                <feComposite operator="atop" in="offset" in2="black" result="merge"></feComposite>
                <feComposite operator="in" in="merge" in2="SourceGraphic" result="inner-shadow"></feComposite>
              </filter>
            </defs>
            <g filter="url(#editing-hole)">
              <g transform="translate(209.79649686813354, 97.39999961853027)">
                <path d="M27.01-20.61L39.94-21.76L39.94-21.76Q35.33-11.65 35.33 0.06L35.33 0.06L35.33 0.06Q33.60 1.28 31.07 1.28L31.07 1.28L31.07 1.28Q28.54 1.28 26.94 0.10L26.94 0.10L26.94 0.10Q25.34-1.09 25.02-2.30L25.02-2.30L25.02-2.30Q23.42-0.64 20.83 0.32L20.83 0.32L20.83 0.32Q18.24 1.28 15.49 1.28L15.49 1.28L15.49 1.28Q12.74 1.28 10.34 0.38L10.34 0.38L10.34 0.38Q7.94-0.51 6.08-2.50L6.08-2.50L6.08-2.50Q1.98-6.85 1.98-15.10L1.98-15.10L1.98-15.10Q1.98-27.90 8.83-35.58L8.83-35.58L8.83-35.58Q15.87-43.52 28.35-43.52L28.35-43.52L28.35-43.52Q36.99-43.52 40.06-39.04L40.06-39.04L40.06-39.04Q41.02-37.63 41.02-35.94L41.02-35.94L41.02-35.94Q41.02-34.24 40.29-32.80L40.29-32.80L40.29-32.80Q39.55-31.36 38.40-30.21L38.40-30.21L38.40-30.21Q35.65-27.65 32.26-27.65L32.26-27.65L32.26-27.65Q30.91-27.65 29.63-28.10L29.63-28.10L29.63-28.10Q29.89-30.02 29.89-32.26L29.89-32.26L29.89-32.26Q29.89-34.50 29.73-35.52L29.73-35.52L29.73-35.52Q29.57-36.54 29.18-37.38L29.18-37.38L29.18-37.38Q28.35-39.10 26.53-39.10L26.53-39.10L26.53-39.10Q24.70-39.10 22.69-37.15L22.69-37.15L22.69-37.15Q20.67-35.20 19.07-32L19.07-32L19.07-32Q15.55-24.83 15.55-16.19L15.55-16.19L15.55-16.19Q15.55-12.22 17.09-9.41L17.09-9.41L17.09-9.41Q18.75-6.34 21.70-6.34L21.70-6.34L21.70-6.34Q22.72-6.34 23.65-6.85L23.65-6.85L23.65-6.85Q24.58-7.36 24.96-7.74L24.96-7.74L27.01-20.61ZM68.03-29.57L68.03-29.57L68.03-29.57Q68.99-31.49 68.99-33.28L68.99-33.28L68.99-33.28Q68.99-35.07 68.80-36.06L68.80-36.06L68.80-36.06Q68.61-37.06 68.16-37.82L68.16-37.82L68.16-37.82Q67.20-39.49 65.28-39.49L65.28-39.49L65.28-39.49Q62.91-39.49 60.99-37.76L60.99-37.76L60.99-37.76Q58.94-35.97 58.94-33.15L58.94-33.15L58.94-33.15Q58.94-31.36 60.19-29.98L60.19-29.98L60.19-29.98Q61.44-28.61 63.36-27.33L63.36-27.33L63.36-27.33Q65.28-26.05 67.46-24.77L67.46-24.77L67.46-24.77Q69.63-23.49 71.55-21.95L71.55-21.95L71.55-21.95Q75.97-18.43 75.97-13.70L75.97-13.70L75.97-13.70Q75.97-10.50 74.27-7.78L74.27-7.78L74.27-7.78Q72.58-5.06 69.76-3.07L69.76-3.07L69.76-3.07Q63.62 1.28 55.49 1.28L55.49 1.28L55.49 1.28Q48.90 1.28 45.50-0.86L45.50-0.86L45.50-0.86Q42.11-3.01 42.11-6.27L42.11-6.27L42.11-6.27Q42.11-12.10 46.66-13.57L46.66-13.57L46.66-13.57Q47.94-14.02 49.89-14.02L49.89-14.02L49.89-14.02Q51.84-14.02 54.08-13.18L54.08-13.18L54.08-13.18Q53.06-10.56 53.06-8.19L53.06-8.19L53.06-8.19Q53.06-3.07 56.70-3.07L56.70-3.07L56.70-3.07Q59.07-3.07 61.02-4.80L61.02-4.80L61.02-4.80Q62.98-6.53 62.98-8.48L62.98-8.48L62.98-8.48Q62.98-10.43 61.73-11.84L61.73-11.84L61.73-11.84Q60.48-13.25 58.62-14.37L58.62-14.37L58.62-14.37Q56.77-15.49 54.62-16.58L54.62-16.58L54.62-16.58Q52.48-17.66 50.62-19.20L50.62-19.20L50.62-19.20Q46.27-22.72 46.27-28.35L46.27-28.35L46.27-28.35Q46.27-32 48.06-34.85L48.06-34.85L48.06-34.85Q49.86-37.70 52.74-39.62L52.74-39.62L52.74-39.62Q58.50-43.52 65.57-43.52L65.57-43.52L65.57-43.52Q72.64-43.52 76.06-41.41L76.06-41.41L76.06-41.41Q79.49-39.30 79.49-35.71L79.49-35.71L79.49-35.71Q79.49-32.58 77.06-30.59L77.06-30.59L77.06-30.59Q74.94-28.93 72.38-28.93L72.38-28.93L72.38-28.93Q69.82-28.93 68.03-29.57Z" fill="#ccc"></path>
              </g>
            </g>
            <style>
                text {
                    font-size: 64px;
                    font-family: Arial Black;
                    dominant-baseline: central;
                    text-anchor: middle;
                }
            </style>
          </svg>
        </div>
        <div class="menu__text">#{gsvm_title}</div>
      </li>`
    )
  );

  button.on("hover:enter", function () {
    Lampa.Activity.push({
      url: "",
      title: Lampa.Lang.translate("gsvm_title"),
      component: pluginComponentId,
      page: 1,
    });
  });

  $(".menu .menu__list").eq(0).append(button);
}

function onAccessModeChanged(value) {
  Lampa.Settings.update();
}

function onOldPasswordEnter(value) {
  enteredOldPassword = value;
  Lampa.Storage.set(key_pluginParam_changePassword_old, hiddenPassword, true);
}

function onNewPasswordEnter(value) {
  enteredNewPassword = value;
  Lampa.Storage.set(key_pluginParam_changePassword_new, hiddenPassword, true);
}

function onChangePasswordButtonClicked() {
  // берём действующий пароль из хранилища
  const actualPassword = Lampa.Storage.get(
    key_pluginStorage_actualPassword,
    defaultPassword
  );

  // если действующий и введённый 'старый' не равны...
  if (actualPassword !== enteredOldPassword) {
    // выводим сообщение
    Lampa.Noty.show(
      Lampa.Lang.translate(
        key_pluginParam_changePassword_notify_invalidOldPassword
      )
    );
  }

  // если новый пароль меньше 3 символов...
  if (enteredNewPassword.length < minPasswordLength) {
    // выводим сообщение
    Lampa.Noty.show(
      Lampa.Lang.translate(
        key_pluginParam_changePassword_notify_invalidNewPassword
      )
    );
  }
  // сохраняем пароль в хранилище
  Lampa.Storage.set(key_pluginStorage_actualPassword, enteredNewPassword);

  // сообщаем что пароль изменён
  Lampa.Noty.show(
    Lampa.Lang.translate(key_pluginParam_changePassword_notify_passwordChanged)
  );
}

function onPasswordParamRender(item) {
  // если сейчас выбран режим не по паролю - добавляем класс hide
  let currentAccessMode = Lampa.Storage.get(key_pluginParam_adultAccessMode);
  if (currentAccessMode != key_pluginParam_adultAccessMode_pass) {
    item.addClass("hide");
  }
}

function addSettings() {
  // добавляем раздел настроек нашего компонента
  Lampa.SettingsApi.addComponent({
    component: pluginId,
    icon: pluginIcon,
    name: Lampa.Lang.translate(pluginTitleKey),
  });

  // добавляем параметр режима доступа
  Lampa.SettingsApi.addParam({
    component: pluginId,
    param: {
      name: key_pluginParam_adultAccessMode,
      type: "select",
      values: {
        [key_pluginParam_adultAccessMode_free]:
          key_pluginParam_adultAccessMode_free,
        [key_pluginParam_adultAccessMode_pass]:
          key_pluginParam_adultAccessMode_pass,
        [key_pluginParam_adultAccessMode_god]:
          key_pluginParam_adultAccessMode_god,
      },
      default: key_pluginParam_adultAccessMode_free,
    },
    field: {
      name: Lampa.Lang.translate(key_pluginParam_adultAccessMode_title),
    },
    onChange: onAccessModeChanged,
  });

  // добавляем параметры смены пароля
  // заголовок
  Lampa.SettingsApi.addParam({
    component: pluginId,
    param: {
      name: key_pluginParam_changePassword_sectionTitle,
      type: "title",
    },
    field: {
      name: Lampa.Lang.translate(key_pluginParam_changePassword_sectionTitle),
    },
    onRender: onPasswordParamRender,
  });

  // поле ввода старого пароля
  Lampa.SettingsApi.addParam({
    component: pluginId,
    param: {
      name: key_pluginParam_changePassword_old,
      type: "input",
      values: hiddenPassword,
      default: hiddenPassword,
    },
    field: {
      name: Lampa.Lang.translate(key_pluginParam_changePassword_old_title),
    },
    onRender: onPasswordParamRender,
    onChange: onOldPasswordEnter,
  });

  // поле воода нового пароля
  Lampa.SettingsApi.addParam({
    component: pluginId,
    param: {
      name: key_pluginParam_changePassword_new,
      type: "input",
      values: hiddenPassword,
      default: hiddenPassword,
    },
    field: {
      name: Lampa.Lang.translate(key_pluginParam_changePassword_new_title),
    },
    onRender: onPasswordParamRender,
    onChange: onNewPasswordEnter,
  });

  // кнопка сменить пароль
  Lampa.SettingsApi.addParam({
    component: pluginId,
    param: {
      name: key_pluginParam_changePassword_btn,
      type: "button",
    },
    field: {
      name: Lampa.Lang.translate(key_pluginParam_changePassword_btn_title),
    },
    onRender: onPasswordParamRender,
  });

  // обработчик нажатия кнопки
  Lampa.Params.listener.follow("button", (e) => {
    if (e.name != key_pluginParam_changePassword_btn) return;
    onChangePasswordButtonClicked();
  });

  // Установка пароля по умолчанию
  if (
    Lampa.Storage.get(key_pluginStorage_actualPassword, defaultPassword) ==
    defaultPassword
  ) {
    Lampa.Storage.set(key_pluginStorage_actualPassword, defaultPassword);
  }
}

function configure() {
  console.log("Test plugin initialization START!");
  addMainMenuActivity();
  addSettings();
  console.log("Test plugin initialization END!");
}

function startPlugin() {
  window.gsvm_test_plugin_is_ready = true;
  Lampa.Component.add(pluginComponentId, Component);

  if (window.appready) {
    configure();
  } else {
    Lampa.Listener.follow("app", function (e) {
      if (e.type == "ready") configure();
    });
  }
}

if (!window.gsvm_test_plugin_is_ready && Lampa.Manifest.app_digital >= 154)
  startPlugin();
