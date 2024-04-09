User creates new note in https://studies.cs.helsinki.fi/exampleapp/notes

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note Form data: { "note": "testi" }
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: The server pushes the new note to the back of the notes list.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the HTML document for notes page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JS file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the notes data JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"Hello , Welcom to the note app","date":"2024-04-09T12:54:03.359Z"},{"content":"Defensive projection detected! ☝ A mentally challenged individual calling others retarded. 🙄","date":"2024-04-09T12:54:52.539Z"},{"content":"","date":"2024-04-09T12:55:59.458Z"},{"content":"Hello, welcome to the retard application ","date":"2024-04-09T12:56:28.296Z"},{"content":"","date":"2024-04-09T12:58:31.776Z"},{"content":"NIGGA +","date":"2024-04-09T12:59:48.586Z"},{"content":"You cant be serious, we are not bots dumbass","date":"2024-04-09T13:00:30.931Z"},{"content":"","date":"2024-04-09T13:01:38.635Z"},{"content":"thats what a bot would say","date":"2024-04-09T13:01:52.685Z"},{"content":"","date":"2024-04-09T13:05:00.867Z"},{"content":"hi im vegan","date":"2024-04-09T13:05:16.216Z"},{"content":"","date":"2024-04-09T13:05:57.529Z"},{"content":"Such happy notes","date":"2024-04-09T13:06:28.593Z"},{"content":"k","date":"2024-04-09T13:06:34.710Z"},{"content":"ok","date":"2024-04-09T13:06:43.368Z"},{"content":"Hello , Welcom to the note app","date":"2024-04-09T13:10:53.003Z"},{"content":"a","date":"2024-04-09T13:10:56.477Z"},{"content":"","date":"2024-04-09T13:21:20.074Z"},{"content":"Milton","date":"2024-04-09T13:21:29.955Z"},{"content":"","date":"2024-04-09T13:23:49.914Z"},{"content":"","date":"2024-04-09T13:23:55.083Z"},{"content":"Hello, fuck off","date":"2024-04-09T13:24:09.881Z"},{"content":"just a test note to see the flow.","date":"2024-04-09T13:24:26.280Z"},{"content":"","date":"2024-04-09T13:25:39.850Z"},{"content":"shut the fk up","date":"2024-04-09T13:25:49.431Z"},{"content":"no u","date":"2024-04-09T13:26:49.575Z"},{"content":"hello","date":"2024-04-09T13:33:20.153Z"},{"content":"rewrsdfs","date":"2024-04-09T13:56:45.101Z"},{"content":"kjj","date":"2024-04-09T13:56:50.816Z"},{"content":"kjjkjj","date":"2024-04-09T13:57:00.036Z"},{"content":"dfsdfds","date":"2024-04-09T13:57:31.810Z"},{"content":"","date":"2024-04-09T13:57:40.182Z"},{"content":"","date":"2024-04-09T13:57:41.059Z"},{"content":"","date":"2024-04-09T13:57:43.120Z"},{"content":"","date":"2024-04-09T13:57:44.678Z"},{"content":"","date":"2024-04-09T13:57:47.091Z"},{"content":"ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh","date":"2024-04-09T13:58:01.115Z"},{"content":"asd","date":"2024-04-09T13:58:04.599Z"},{"content":"nnn","date":"2024-04-09T14:00:59.165Z"},{"content":"jkjkjkj","date":"2024-04-09T14:01:04.470Z"},{"content":"","date":"2024-04-09T14:02:03.916Z"},{"content":"👀","date":"2024-04-09T14:03:03.886Z"},{"content":"manzai","date":"2024-04-09T14:03:46.163Z"},{"content":"no","date":"2024-04-09T14:14:55.689Z"},{"content":"test","date":"2024-04-09T14:16:11.337Z"},{"content":"","date":"2024-04-09T14:20:46.212Z"},{"content":"puuuuntaaaaaa paraguay","date":"2024-04-09T14:22:14.906Z"},{"content":"Hola","date":"2024-04-09T14:24:37.350Z"},{"content":"kjnj,","date":"2024-04-09T14:26:32.235Z"},{"content":"hello","date":"2024-04-09T14:26:42.410Z"},{"content":"Looks like a loser has used this field too much!","date":"2024-04-09T14:30:28.059Z"},{"content":"Looks like a loser has used this field too much!","date":"2024-04-09T14:30:42.911Z"},{"content":"fuck off","date":"2024-04-09T14:33:53.344Z"},{"content":"smd","date":"2024-04-09T14:34:15.672Z"},{"content":"hello","date":"2024-04-09T14:37:23.433Z"},{"content":"hi there!","date":"2024-04-09T14:37:45.729Z"},{"content":"super auto pet","date":"2024-04-09T14:45:50.222Z"},{"content":"are you gay","date":"2024-04-09T14:46:07.148Z"},{"content":"yes","date":"2024-04-09T14:48:46.521Z"},{"content":"y","date":"2024-04-09T14:55:00.613Z"},{"content":"Nota","date":"2024-04-09T14:56:13.117Z"},{"content":"ofcourse not","date":"2024-04-09T14:57:27.570Z"},{"content":"olen","date":"2024-04-09T15:00:30.792Z"},{"content":"","date":"2024-04-09T15:01:15.358Z"},{"content":"hello","date":"2024-04-09T15:07:18.476Z"},{"content":"👾","date":"2024-04-09T15:08:17.616Z"},{"content":"im not alone here?? 😭","date":"2024-04-09T15:11:01.845Z"},{"content":"hii","date":"2024-04-09T15:13:05.612Z"},{"content":"Holi","date":"2024-04-09T15:25:01.425Z"},{"content":"moriste en madrid","date":"2024-04-09T15:25:43.645Z"},{"content":"moriste en madrid","date":"2024-04-09T15:29:40.165Z"},{"content":"9/12","date":"2024-04-09T15:34:01.541Z"},{"content":"101","date":"2024-04-09T15:43:27.031Z"},{"content":"102","date":"2024-04-09T15:43:45.515Z"},{"content":"sa beler turk warmi","date":"2024-04-09T15:44:46.208Z"},{"content":"en buyuk fb","date":"2024-04-09T15:46:45.217Z"},{"content":"hello😨","date":"2024-04-09T15:47:40.058Z"},{"content":"Hello, World!","date":"2024-04-09T15:49:12.067Z"},{"content":"testing part0","date":"2024-04-09T15:52:58.311Z"},{"content":"Kaaviotesti","date":"2024-04-09T15:58:06.206Z"},{"content":"so many notes","date":"2024-04-09T16:03:53.578Z"},{"content":"a","date":"2024-04-09T16:04:00.760Z"},{"content":"plenty","date":"2024-04-09T16:04:40.179Z"},{"content":"+++++++","date":"2024-04-09T16:07:39.972Z"},{"content":"///||||\\\\\\","date":"2024-04-09T16:08:43.027Z"},{"content":"it is a single page application","date":"2024-04-09T16:12:12.086Z"},{"content":"it is not a spa","date":"2024-04-09T16:12:28.781Z"},{"content":"00","date":"2024-04-09T16:20:38.751Z"},{"content":"01","date":"2024-04-09T16:28:22.688Z"},{"content":"Note Form Submit test","date":"2024-04-09T16:28:35.338Z"},{"content":"02","date":"2024-04-09T16:28:51.666Z"},{"content":"hola amiguitos :D","date":"2024-04-09T16:29:26.920Z"},{"content":"Assalamu alaikum Everyone(may allah subhanahu wa ta'ala bless you). I am From Bangladesh . Let's Begin the Journey.","date":"2024-04-09T16:36:48.402Z"},{"content":"Hola","date":"2024-04-09T16:36:59.567Z"},{"content":"test","date":"2024-04-09T16:43:11.550Z"},{"content":"Test","date":"2024-04-09T16:46:00.663Z"},{"content":"","date":"2024-04-09T16:49:07.635Z"},{"content":"test2","date":"2024-04-09T16:49:42.997Z"},{"content":"Hello world","date":"2024-04-09T16:53:43.000Z"},{"content":"testi","date":"2024-04-09T16:55:51.738Z"}]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```


User goes to the single page app at [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/spa)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```


User creates a new note in the single page app at [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/spa)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
