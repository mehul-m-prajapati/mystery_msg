### Setup

```bash
npm i
npm run dev
```

### Folder structure
```
├───emails
|   ├─── VerificationEmail.tsx
|
│   messages.json
│   middleware.ts
│
├───app
│   │   favicon.ico
│   │   globals.css
│   │   layout.tsx
│   │
│   ├───(app)
│   │   │   layout.tsx
│   │   │   page.tsx
│   │   │
│   │   └───dashboard
│   │           page.tsx
│   │
│   ├───(auth)
│   │   ├───sign-in
│   │   │       page.tsx
│   │   │
│   │   ├───sign-up
│   │   │       page.tsx
│   │   │
│   │   └───verify
│   │       └───[username]
│   │               page.tsx
│   │
│   ├───api
│   │   ├───accept-messages
│   │   │       route.ts
│   │   │
│   │   ├───auth
│   │   │   └───[...nextauth]
│   │   │           options.ts
│   │   │           route.ts
│   │   │
│   │   ├───check-username-unique
│   │   │       route.ts
│   │   │
│   │   ├───delete-message
│   │   │   └───[messageid]
│   │   │           route.ts
│   │   │
│   │   ├───get-messages
│   │   │       route.ts
│   │   │
│   │   ├───send-message
│   │   │       route.ts
│   │   │
│   │   ├───sign-up
│   │   │       route.ts
│   │   │
│   │   ├───suggest-messages
│   │   │       route.ts
│   │   │
│   │   └───verify-code
│   │           route.ts
│   │
│   └───u
│       └───[username]
│               page.tsx
│
├───components
│   │   MessageCard.tsx
│   │   Navbar.tsx
│   │
│   └───ui
│           alert-dialog.tsx
│           button.tsx
│           card.tsx
│           carousel.tsx
│           form.tsx
│           input.tsx
│           label.tsx
│           separator.tsx
│           sonner.tsx
│           switch.tsx
│           textarea.tsx
│
├───context
│       AuthProvider.tsx
│
├───helpers
│       sendVerificationEmail.tsx
│
├───lib
│       dbConnect.ts
│       resend.ts
│       utils.ts
│
├───model
│       User.ts
│
├───schemas
│       acceptMessageSchema.ts
│       messageSchema.ts
│       signInSchema.ts
│       signUpSchema.ts
│       verifySchema.ts
│
└───types
        ApiResponse.ts
        next-auth.d.ts
```
