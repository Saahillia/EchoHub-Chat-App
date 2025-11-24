                                               ** Official Status Codes**

#**1xx – Informational Responses**
| Code                        | Meaning                               | Why It's Used                                |
| --------------------------- | ------------------------------------- | -------------------------------------------- |
| **100 Continue**            | Server received request headers       | Client can continue sending body             |
| **101 Switching Protocols** | Server agrees to switch protocol      | Used in WebSocket upgrades                   |
| **102 Processing**          | Server is processing but not finished | Prevents timeout on long tasks               |
| **103 Early Hints**         | Server sending early preload hints    | Improves performance by preloading resources |


#**2xx – Success Responses**
| Code                           | Meaning                                  | Why It's Used                               |
| ------------------------------ | ---------------------------------------- | ------------------------------------------- |
| **200 OK**                     | Request was successful                   | Returned for successful GET/POST/PUT/DELETE |
| **201 Created**                | Resource created successfully            | Used after signup, creating new records     |
| **202 Accepted**               | Request accepted but not completed       | Used for async tasks                        |
| **203 Non-Authoritative Info** | Returned metadata is modified by proxy   | Rarely used                                 |
| **204 No Content**             | Successful but no data to return         | DELETE requests / empty responses           |
| **205 Reset Content**          | Client should reset the form             | Used in UI form submissions                 |
| **206 Partial Content**        | Partial data returned                    | Used in video streaming, large downloads    |
| **207 Multi-Status**           | Multiple response codes in one response  | Used in WebDAV                              |
| **208 Already Reported**       | Avoids duplicate reporting               | Also WebDAV                                 |
| **226 IM Used**                | Server fulfilled request using resources | Rare/experimental                           |


#**3xx – Redirection Responses**
| Code                       | Meaning                                 | Why It's Used                        |
| -------------------------- | --------------------------------------- | ------------------------------------ |
| **300 Multiple Choices**   | Multiple possible responses             | Browser chooses best option          |
| **301 Moved Permanently**  | Resource location changed forever       | Used for SEO-friendly URL redirects  |
| **302 Found**              | Temporary redirect                      | Common in login redirects            |
| **303 See Other**          | Redirect using GET method               | After form submission                |
| **304 Not Modified**       | Cached version is still valid           | Improves performance                 |
| **305 Use Proxy**          | Must access via proxy                   | Deprecated                           |
| **306 Switch Proxy**       | No longer used                          | Reserved                             |
| **307 Temporary Redirect** | Same as 302 but method must remain same | Safe redirect                        |
| **308 Permanent Redirect** | Same as 301 but method must remain same | Permanent method-preserving redirect |


#**4xx – Client Errors**
| Code                                  | Meaning                               | Why It's Used                               |
| ------------------------------------- | ------------------------------------- | ------------------------------------------- |
| **400 Bad Request**                   | Invalid request format/input          | Missing fields, invalid JSON                |
| **401 Unauthorized**                  | Not logged in / no token provided     | Login needed                                |
| **402 Payment Required**              | Reserved for future payments          | Rare                                        |
| **403 Forbidden**                     | Logged in but not allowed             | Role restrictions / access denied           |
| **404 Not Found**                     | Requested resource doesn't exist      | Wrong URL, missing user/message             |
| **405 Method Not Allowed**            | HTTP method not supported             | Example: POST not allowed                   |
| **406 Not Acceptable**                | Server can't return requested format  | e.g., client wants XML but only JSON exists |
| **407 Proxy Auth Required**           | Must authenticate with proxy          | Enterprise networks                         |
| **408 Request Timeout**               | Client took too long                  | Slow internet / long request                |
| **409 Conflict**                      | Conflict with current state           | Email already exists, duplicate entries     |
| **410 Gone**                          | Resource permanently deleted          | Rarely used                                 |
| **411 Length Required**               | Missing Content-Length header         | Required in some APIs                       |
| **412 Precondition Failed**           | Headers conditions not met            | Version mismatch                            |
| **413 Payload Too Large**             | Request body too large                | Huge images/files                           |
| **414 URI Too Long**                  | URL too long                          | Misused GET requests                        |
| **415 Unsupported Media Type**        | Server doesn't accept file type       | Example: uploading .exe file                |
| **416 Range Not Satisfiable**         | Invalid byte range                    | Video streaming errors                      |
| **417 Expectation Failed**            | “Expect” header not fulfilled         | Rare                                        |
| **418 I'm a Teapot**                  | Joke status code                      | Part of April Fool's RFC                    |
| **421 Misdirected Request**           | Server not meant to handle request    | HTTP/2 issue                                |
| **422 Unprocessable Entity**          | Valid JSON but semantically incorrect | Form validation errors                      |
| **423 Locked**                        | Resource is locked                    | WebDAV                                      |
| **424 Failed Dependency**             | Previous request failed               | WebDAV                                      |
| **425 Too Early**                     | Prevents retry attacks                | TLS security                                |
| **426 Upgrade Required**              | Client must upgrade protocol          | Example: HTTP -> HTTPS                      |
| **428 Precondition Required**         | Precondition headers required         | Prevent lost updates                        |
| **429 Too Many Requests**             | Rate limit exceeded                   | API throttle                                |
| **431 Header Too Large**              | Request headers too large             | Cookies too big                             |
| **451 Unavailable For Legal Reasons** | Blocked due to law                    | Government restrictions                     |


#**5xx – Server Errors**
| Code                                    | Meaning                                  | Why It's Used               |
| --------------------------------------- | ---------------------------------------- | --------------------------- |
| **500 Internal Server Error**           | Server failed unexpectedly               | Bugs, crashes, DB errors    |
| **501 Not Implemented**                 | Server doesn't support this feature      | Not coded yet               |
| **502 Bad Gateway**                     | Invalid response from upstream server    | Proxy / microservice issues |
| **503 Service Unavailable**             | Server overloaded or down                | Maintenance mode            |
| **504 Gateway Timeout**                 | Upstream server took too long            | DB timeout                  |
| **505 HTTP Version Not Supported**      | Server doesn't support protocol          | Rare                        |
| **506 Variant Also Negotiates**         | Negotiation failure                      | Rare                        |
| **507 Insufficient Storage**            | Server has no storage left               | Disk full                   |
| **508 Loop Detected**                   | Infinite loop in request                 | WebDAV                      |
| **510 Not Extended**                    | Extensions required                      | Very rare                   |
| **511 Network Authentication Required** | Authentication required at network level | WiFi login pages            |



                                    **UNOFFICIAL / VENDOR-SPECIFIC STATUS CODES**

#**Microsoft IIS Codes**
| Code                  | Meaning                      | Why Used          |
| --------------------- | ---------------------------- | ----------------- |
| **440 Login Timeout** | Session expired              | User inactive     |
| **449 Retry With**    | Retry request with more info | Missing parameter |
| **451 Redirect**      | Server redirect              | Similar to 302    |


#**Nginx Codes**
| Code                             | Meaning                         | Why Used              |
| -------------------------------- | ------------------------------- | --------------------- |
| **494 Request Header Too Large** | Headers too big                 | Oversized cookies     |
| **495 SSL Certificate Error**    | Client SSL certificate invalid  | HTTPS issue           |
| **496 SSL Certificate Required** | Client must present certificate | Secure networks       |
| **497 HTTP to HTTPS Redirect**   | Wrong protocol used             | Redirect to HTTPS     |
| **499 Client Closed Request**    | Client closed connection        | User canceled request |


#**Cloudflare Codes**
| Code                                      | Meaning                    |
| ----------------------------------------- | -------------------------- |
| **520 Web Server Returned Unknown Error** | Unknown server response    |
| **521 Web Server Down**                   | Server refused connection  |
| **522 Connection Timed Out**              | Server too slow            |
| **523 Origin Unreachable**                | DNS or network issue       |
| **524 A Timeout Occurred**                | Long-running request       |
| **525 SSL Handshake Failed**              | SSL certificate mismatch   |
| **526 Invalid SSL Certificate**           | Invalid certificate        |
| **527 Railgun Error**                     | Cloudflare Railgun failure |
| **530 Origin DNS Error**                  | DNS lookup failed          |


#**Esri (GIS APIs)**
| Code                   | Meaning       |
| ---------------------- | ------------- |
| **498 Invalid Token**  | Token expired |
| **499 Token Required** | Token missing |


#**AWS / Custom**
| Code                          | Meaning                   |
| ----------------------------- | ------------------------- |
| **460 Client Closed Request** | Client disconnected early |
| **463 Unauthorized Client**   | Invalid client identity   |
