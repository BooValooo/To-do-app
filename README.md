## Project structure

```
$PROJECT_ROOT
├── App.tsx
├── app.json
├── babel.config.js
├── package-lock.json
├── package.json
├── src
│   ├── Assets
│   │   ├── Avatars-2.png
│   │   ├── Avatars.png
│   │   ├── OnBoarding1.png
│   │   └── OnBoarding2.png
│   ├── Components
│   │   ├── CalendarDay.tsx
│   │   ├── CalendarMonth.tsx
│   │   ├── CalendarWeek.tsx
│   │   ├── ColorSelection.tsx
│   │   ├── FloatingActionButton.tsx
│   │   ├── Headbar.tsx
│   │   ├── ModalChat.tsx
│   │   ├── ModalOptions.tsx
│   │   ├── MonthBar.tsx
│   │   ├── MonthYearPicker.tsx
│   │   ├── NewTaskModal.tsx
│   │   ├── NoteBox.tsx
│   │   ├── NoteList.tsx
│   │   ├── SelectTag.tsx
│   │   ├── SelectTagEntry.tsx
│   │   ├── SettingsShow.tsx
│   │   ├── SettingsToggle.tsx
│   │   ├── TagEntry.tsx
│   │   ├── TaskBox.tsx
│   │   ├── TaskList.tsx
│   │   ├── WeekDaysBar.tsx
│   │   ├── app-container.tsx
│   │   └── defaultValues.tsx
│   ├── Utils
│   │   ├── Colors.tsx
│   │   ├── database_utils.tsx
│   │   ├── getDaysInMonth.tsx
│   │   ├── getFirstDayOfMonth.tsx
│   │   ├── note.tsx
│   │   ├── tag.tsx
│   │   └── task.tsx
│   ├── Views
│   │   ├── Calendar.tsx
│   │   ├── Filter.tsx
│   │   ├── OnBoarding1.tsx
│   │   ├── OnBoarding2.tsx
│   │   ├── Settings.tsx
│   │   ├── main-screen.tsx
│   │   └── tagManager.tsx
│   ├── index.tsx
│   └── theme.ts
└── tsconfig.json


```


## How to dev

This project can be run from the Expo client app.

```sh
cd EaseTask
npm install
npm start -- --reset-cache
```
