import store from '@/store'

const locales = {
  'ru-RU': {
    "ProfileTitle": "Профиль",
    "Message_EnterName": "Введите имя",
    "Update": "Обновить",
    "Updated": "Обновлено",
    "Create": "Создать",
    "Bill": "Счет",
    "Name": "Имя",
    "Exit": "Выйти",
    "Edit": "Редактировать",
    "Menu_Bill": "Счет",
    "Detail_Title": "Запись",
    "Menu_History": "История",
    "Menu_Planning": "Планирование",
    "Menu_NewRecord": "Новая запись",
    "Menu_Categories": "Категории",
    "Выйти": "Выйти",
    "Title": "Название",
    "Limit": "Лимит",
    "Message_EnterDescription": "Введите описание",
    "Message_EnterAmount": "Введите сумму",
    "Message_EnterLimit": "Введите лимит",
    "Message_CategoryTitle": "Введите название категории",
    "Message_MinLength": "Минимальное значение",
    "Category_HasBeenCreated": "Категория была создана",
    "Category_HasBeenUpdated": "Категория упешно обновлена",
    "SelectCategory": "Выберите категорию",
    "Amount": "Сумма",
    "Date": "Дата",
    "Description": "Описание",
    "Category": "Категория",
    "Categories": "Категории",
    "NoCategories": "Категорий пока нет",
    "Type": "Тип",
    "Open": "Открыть",
    "OpenRecord": "Посмотреть запись",
    "BillInCurrency": "Счет в валюте",
    "Currency": "Валюта",
    "CurrencyType": "Курс",
    "CurrencyAmountTitle": "Курс валют",
    "Income": "Доход",
    "Outcome": "Расход",
    "Of": "из",
    "History_Title": "История записей",
    "NoRecords": "Записей пока нет",
    "AddFirst": "Добавьте первую",
    "Back": "Назад",
    "Forward": "Вперед",
    "CostsForCategories": "Расходы по категориям",
    "MoreThan": "Превышение на",
    "Stayed": "Осталось",
    "RecordHasBeenCreated": "Запись успешно создана",
    "NotEnoughMoney": "Недостаточно средств на счете",
    "CRM_Title": "Домашняя бухгалтерия",
    "Message_EmailRequired": "Поле Email не должно быть пустым",
    "Message_EmailValid": "Введите корретный Email",
    "Password": "Пароль",
    "RepeatPassword": "Пароли не совпали",
    "Message_EnterPassword": "Введите пароль",
    "Login": "Войти",
    "NoAccount": "Нет аккаунта?",
    "HasAccount": "Уже есть аккаунт?",
    "Register": "Зарегистрироваться",
    "AcceptRules": "С правилами согласен",
    "CreateNewRecord": "Создать новую запись",
    "Logout": "Вы вышли из системы",
    "FirstLogin": "Для начала войдите в систему",
    "NoUserWithEmail": "Пользователя с таким email не существует",
    "WrongPassword": "Неверный пароль",
    "EmailInUse": "Email уже занят",
    "Error": "Ошибка"
  },
  'en-US': {
    "ProfileTitle": "Profile",
    "Message_EnterName": "Enter name",
    "Update": "Update",
    "Updated": "Updated",
    "Create": "Create",
    "Bill": "Bill",
    "Name": "Name",
    "Exit": "Exit",
    "Edit": "Edit",
    "Menu_Bill": "Bill",
    "Detail_Title": "Detail",
    "Menu_History": "History",
    "Menu_Planning": "Planning",
    "Menu_NewRecord": "New record",
    "Menu_Categories": "Categories",
    "Title": "Title",
    "Limit": "Limit",
    "Message_EnterDescription": "Enter description",
    "Message_EnterAmount": "Enter Amount",
    "Message_EnterLimit": "Enter limit",
    "Message_CategoryTitle": "Enter category name",
    "Message_MinLength": "Mininum length is",
    "Category_HasBeenCreated": "Category has been created",
    "Category_HasBeenUpdated": "Category has been updated",
    "SelectCategory": "Select category",
    "Amount": "Amount",
    "Date": "Date",
    "Description": "Description",
    "Category": "Category",
    "Categories": "Categories",
    "NoCategories": "No categories",
    "Type": "Type",
    "Open": "Open",
    "OpenRecord": "Open record",
    "BillInCurrency": "Bill in currencies",
    "Currency": "Currency",
    "CurrencyType": "Rate",
    "CurrencyAmountTitle": "Currencies rates",
    "Income": "Income",
    "Outcome": "Outcome",
    "Of": "of",
    "History_Title": "Records history",
    "NoRecords": "No records",
    "AddFirst": "Add first",
    "Back": "Back",
    "Forward": "Forward",
    "CostsForCategories": "Categories costs",
    "MoreThan": "Excess on",
    "Stayed": "Left",
    "RecordHasBeenCreated": "Record has been created",
    "NotEnoughMoney": "Not enough money",
    "CRM_Title": "CRM by Vladilen",
    "Message_EmailRequired": "Email field is required",
    "Message_EmailValid": "Enter valid email",
    "Password": "Password",
    "RepeatPassword": "Not same password",
    "Message_EnterPassword": "Enter password",
    "Login": "Login",
    "NoAccount": "Has no account?",
    "HasAccount": "Has account?",
    "Register": "Register",
    "AcceptRules": "Agree with rules",
    "CreateNewRecord": "Create new record",
    "Logout": "You have logged out",
    "FirstLogin": "First login",
    "NoUserWithEmail": "No user with email",
    "WrongPassword": "Invalid password",
    "EmailInUse": "Email is already in use",
    "Error": "Error"
  },

}

export default function localeFilter(val) {
  let key
  if (store.getters.info) {
    key = store.getters.info.locales || 'ru-RU'
  } else {
    key = 'ru-RU'
  }


  return locales[key][val] || `[Locale Error]: Key ${val} not found!`
}