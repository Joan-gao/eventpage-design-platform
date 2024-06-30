<h1 align="center">Eventpage Design Platform</h1>

## **Introduction**

We have developed an EventPage design platform that streamlines the entire process from creation to publication. By integrating ChatGPT and MidJourney, the platform enables efficient image generation and smart copywriting, significantly lowering design barriers. It supports adding interactive elements like text, stickers, and buttons, enhancing live stream engagement and conversion rates. This platform is designed to optimize the TikTok live streaming experience by making event page creation quick and easy.

## **Technologies Use**

1. **Frontend**: React, Typescript, JavaScript, Tailwind css
2. **UI Toolkit**: Ant Design
3. **Backend**: Flask
4. **AI Integration**: ChatGPT API, Midjourney API

## **Core Features**

1. **GeneratePage**

- **Functionality**: Users can choose between creation and examples. In creation, they fill out a form describing their event poster idea, select a style (real or anime), and choose a size (1:1 or 16:9). They can also view and apply example event pages for reference and further modification.

2. **ChatPage**

- **Functionality**: After submitting the form, users enter the chat page to interact with the MidJourney AI bot. The bot generates descriptions and image examples based on the user's input. Users can modify prompts or regenerate images before selecting and moving to the next step.

3. **DesignPage**

- **Functionality**: Provides a toolbar for editing the event page, allowing users to add text, components, music, and copywriting. Users can edit button titles and links for interactive elements like live subscriptions and coupon collections. Once editing is complete, they can publish directly to their TikTok video page.

## Technical Highlights

1. **Precise Image Generation**: Integrating MidJourney API and ChatGPT API to enable precise text-to-prompt-to-image generation. ChatGPT converts user descriptions into professional prompts for MidJourney, which then generates the images. It also supports image-to-image functionality for detailed modifications.

2. **Interactive Component Manipulation**: Utilizing React-RND for interactive component manipulation, allowing users to freely drag, resize, and scale elements on the DesignPage.

3. **Advanced Interactive Behaviors**: Enabling users to define interactive behaviors by customizing button titles and links, as well as adding advanced interactions such as generating QR codes, triggering pop-ups for live stream subscriptions, and displaying coupon messages, providing ideas for future interactive features.

4. **Smart Copywriting**: Leveraging ChatGPT API to refine user drafts using prompt engineering, the smart copywriting feature generates TikTok-style content and adds relevant tags to enhance video engagement.

## Links

- ([Figma](https://www.figma.com/design/K4paycUTmDi1UPivG5Y3qi/tiktok-evenpage-design-platform?node-id=0-1&t=I4h6lhU1aygq2q2R-1))
- ([Devpost](https://drive.google.com/file/d/1a72KiaWNZy_RF3DWihqkiE9QrL39gGF1/view?usp=sharing))
- ([Demo Video](https://drive.google.com/file/d/12pQbA4ywGYH6YanbJhsRlm3OlnadnIaQ/view?usp=sharing))

## Contributors

- [Xinyi Gao](https://www.linkedin.com/in/xinyi-gao-cn/): Product Design, UI/UX Design, Front-end Development
- [Viet Doan](https://www.linkedin.com/in/viet-doan-vqd/): UI/UX Design, Front-end Development
- [Li Cui](https://www.linkedin.com/in/li-cui-73809027b): AI Integration, Backend Development

## Credits

The TikTok UI Clone was created by [s-shemmee](https://github.com/s-shemmee).
