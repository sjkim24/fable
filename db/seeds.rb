u1 = User.create(username: "sj", email:"sjkim0421@gmail.com", password: "hello123", fullname: "sj kim", user_desc: "Software Engineer, Pizza Lover, Microphone Checker")
u2 = User.create(username: "chillinrobby", email:"dummy@email.com", password: "hello123", fullname: "robby chillin", user_desc: "Professional Chiller")
u3 = User.create(username: "bonfirepoetry", email:"dummy2@email.com", password: "hello123", fullname: "poetic justice", user_desc: "AKA Kendrick Lamar")
u4 = User.create(username: "guest", email: "guest@email.com", password: "hello123", fullname: "guestie guest")

s1 = Story.create(user_id: u1.id, title: "hello world", subtitle: "tundra mountain boogie boogie boogie monster", content: "Lorem ipsum dolor sit amet, molestie bibendum. Lorem varius lobortis, urna molestie, vel pellentesque dolor ipsum pharetra, wisi ultricies aliquam quis non elementum in. Ac pede, ultricies dolor arcu lectus. Leo suspendisse ullamcorper, fermentum malesuada pulvinar molestie eros sit. Id neque ipsum tortor scelerisque. Blandit velit. Vulputate nam sed. Et odio ante odio suspendisse ad tortor, consectetuer quisque commodo ad, pellentesque pellentesque, arcu malesuada tellus sed, hendrerit arcu nullam aliquam consectetuer. Curabitur quis euismod at erat, tempus amet per lacus, et morbi justo arcu donec at, massa lacus eget justo malesuada turpis. Sit quam urna aenean, pellentesque posuere consequatur eu quis aliquam, nulla et.
Ut nullam urna phasellus integer, accumsan metus dignissim ut erat, venenatis vitae vestibulum massa. Rhoncus senectus, mauris at ac lorem parturient ante, mollis in nibh dolor. Mollis felis morbi tortor in nunc, augue diamlorem eget orci lacus eiusmod vivamus. Non a ut rhoncus sem libero metus, feugiat mauris feugiat turpis mi lacinia arcu. Arcu lorem imperdiet varius blandit, laoreet libero rhoncus nulla et, dui nec lacus, quis enim et nisl, orci orci.
Donec nonummy, dui commodo lectus tellus wisi tortor. Non tellus massa vehicula lacinia metus, proin nulla semper, tincidunt pretium bibendum justo sed neque sit. Nunc et pellentesque quis risus a. Pellentesque nunc rutrum vel venenatis duis, eu ut, cursus morbi at torquent cursus, nibh risus, nunc quisque eum amet libero vitae. Cras ullamcorper dictum mauris, ut gravida elit, risus sed, integer elementum nam, in integer nibh. Mollis et in est montes integer nec, congue sit, cras semper nunc a justo quis quam, netus vivamus nonummy ante gravida.
Sem primis in, at dolor pulvinar ac blandit praesent, libero a aliquet dolores. At scelerisque dui blandit id, sociis pellentesque, egestas vestibulum, sed mauris congue. Urna turpis facilisis malesuada at, lacinia interdum pretium donec cras aliquam vitae, est ac sed leo odio eu id, mauris diam eget donec, sed ut vivamus ac dapibus id rutrum. Odio leo quis nibh, quasi euismod suscipit mollis libero, ipsum et, adipiscing dolor sollicitudin vel sed sagittis magnis, et iaculis lorem orci ipsa. Nec arcu, aenean auctor, sem mi orci. Aenean viverra habitasse nunc nunc pharetra. Magna a condimentum non sem. Ut praesent habitant semper justo, iaculis et orci eu dolor euismod. Nec vivamus aliquid ipsum massa, fusce massa nam, sodales metus consectetuer diam, et in lectus.")

s2 = Story.create(user_id: u2.id, title: "hello world", subtitle: "hello world my name is subtitle jones", content: "Lorem ipsum dolor sit amet, molestie bibendum. Lorem varius lobortis, urna molestie, vel pellentesque dolor ipsum pharetra, wisi ultricies aliquam quis non elementum in. Ac pede, ultricies dolor arcu lectus. Leo suspendisse ullamcorper, fermentum malesuada pulvinar molestie eros sit. Id neque ipsum tortor scelerisque. Blandit velit. Vulputate nam sed. Et odio ante odio suspendisse ad tortor, consectetuer quisque commodo ad, pellentesque pellentesque, arcu malesuada tellus sed, hendrerit arcu nullam aliquam consectetuer. Curabitur quis euismod at erat, tempus amet per lacus, et morbi justo arcu donec at, massa lacus eget justo malesuada turpis. Sit quam urna aenean, pellentesque posuere consequatur eu quis aliquam, nulla et.
Ut nullam urna phasellus integer, accumsan metus dignissim ut erat, venenatis vitae vestibulum massa. Rhoncus senectus, mauris at ac lorem parturient ante, mollis in nibh dolor. Mollis felis morbi tortor in nunc, augue diamlorem eget orci lacus eiusmod vivamus. Non a ut rhoncus sem libero metus, feugiat mauris feugiat turpis mi lacinia arcu. Arcu lorem imperdiet varius blandit, laoreet libero rhoncus nulla et, dui nec lacus, quis enim et nisl, orci orci.
Donec nonummy, dui commodo lectus tellus wisi tortor. Non tellus massa vehicula lacinia metus, proin nulla semper, tincidunt pretium bibendum justo sed neque sit. Nunc et pellentesque quis risus a. Pellentesque nunc rutrum vel venenatis duis, eu ut, cursus morbi at torquent cursus, nibh risus, nunc quisque eum amet libero vitae. Cras ullamcorper dictum mauris, ut gravida elit, risus sed, integer elementum nam, in integer nibh. Mollis et in est montes integer nec, congue sit, cras semper nunc a justo quis quam, netus vivamus nonummy ante gravida.
Sem primis in, at dolor pulvinar ac blandit praesent, libero a aliquet dolores. At scelerisque dui blandit id, sociis pellentesque, egestas vestibulum, sed mauris congue. Urna turpis facilisis malesuada at, lacinia interdum pretium donec cras aliquam vitae, est ac sed leo odio eu id, mauris diam eget donec, sed ut vivamus ac dapibus id rutrum. Odio leo quis nibh, quasi euismod suscipit mollis libero, ipsum et, adipiscing dolor sollicitudin vel sed sagittis magnis, et iaculis lorem orci ipsa.
Nec arcu, aenean auctor, sem mi orci. Aenean viverra habitasse nunc nunc pharetra. Magna a condimentum non sem. Ut praesent habitant semper justo, iaculis et orci eu dolor euismod. Nec vivamus aliquid ipsum massa, fusce massa nam, sodales metus consectetuer diam, et in lectus.")

s3 = Story.create(user_id: u4.id, title: "good morning", subtitle: "pizza hamburger french fries super apple pie", content: "Lorem ipsum dolor sit amet, molestie bibendum. Lorem varius lobortis, urna molestie, vel pellentesque dolor ipsum pharetra, wisi ultricies aliquam quis non elementum in. Ac pede, ultricies dolor arcu lectus. Leo suspendisse ullamcorper, fermentum malesuada pulvinar molestie eros sit. Id neque ipsum tortor scelerisque. Blandit velit. Vulputate nam sed. Et odio ante odio suspendisse ad tortor, consectetuer quisque commodo ad, pellentesque pellentesque, arcu malesuada tellus sed, hendrerit arcu nullam aliquam consectetuer. Curabitur quis euismod at erat, tempus amet per lacus, et morbi justo arcu donec at, massa lacus eget justo malesuada turpis. Sit quam urna aenean, pellentesque posuere consequatur eu quis aliquam, nulla et.
Ut nullam urna phasellus integer, accumsan metus dignissim ut erat, venenatis vitae vestibulum massa. Rhoncus senectus, mauris at ac lorem parturient ante, mollis in nibh dolor. Mollis felis morbi tortor in nunc, augue diamlorem eget orci lacus eiusmod vivamus. Non a ut rhoncus sem libero metus, feugiat mauris feugiat turpis mi lacinia arcu. Arcu lorem imperdiet varius blandit, laoreet libero rhoncus nulla et, dui nec lacus, quis enim et nisl, orci orci.
Donec nonummy, dui commodo lectus tellus wisi tortor. Non tellus massa vehicula lacinia metus, proin nulla semper, tincidunt pretium bibendum justo sed neque sit. Nunc et pellentesque quis risus a. Pellentesque nunc rutrum vel venenatis duis, eu ut, cursus morbi at torquent cursus, nibh risus, nunc quisque eum amet libero vitae. Cras ullamcorper dictum mauris, ut gravida elit, risus sed, integer elementum nam, in integer nibh. Mollis et in est montes integer nec, congue sit, cras semper nunc a justo quis quam, netus vivamus nonummy ante gravida.
Sem primis in, at dolor pulvinar ac blandit praesent, libero a aliquet dolores. At scelerisque dui blandit id, sociis pellentesque, egestas vestibulum, sed mauris congue. Urna turpis facilisis malesuada at, lacinia interdum pretium donec cras aliquam vitae, est ac sed leo odio eu id, mauris diam eget donec, sed ut vivamus ac dapibus id rutrum. Odio leo quis nibh, quasi euismod suscipit mollis libero, ipsum et, adipiscing dolor sollicitudin vel sed sagittis magnis, et iaculis lorem orci ipsa.
Nec arcu, aenean auctor, sem mi orci. Aenean viverra habitasse nunc nunc pharetra. Magna a condimentum non sem. Ut praesent habitant semper justo, iaculis et orci eu dolor euismod. Nec vivamus aliquid ipsum massa, fusce massa nam, sodales metus consectetuer diam, et in lectus.")

s4 = Story.create(user_id: u3.id, title: "hello there", subtitle: "tundra mountain boogie boogie boogie monster", content: "Lorem ipsum dolor sit amet, molestie bibendum. Lorem varius lobortis, urna molestie, vel pellentesque dolor ipsum pharetra, wisi ultricies aliquam quis non elementum in. Ac pede, ultricies dolor arcu lectus. Leo suspendisse ullamcorper, fermentum malesuada pulvinar molestie eros sit. Id neque ipsum tortor scelerisque. Blandit velit. Vulputate nam sed. Et odio ante odio suspendisse ad tortor, consectetuer quisque commodo ad, pellentesque pellentesque, arcu malesuada tellus sed, hendrerit arcu nullam aliquam consectetuer. Curabitur quis euismod at erat, tempus amet per lacus, et morbi justo arcu donec at, massa lacus eget justo malesuada turpis. Sit quam urna aenean, pellentesque posuere consequatur eu quis aliquam, nulla et.
Ut nullam urna phasellus integer, accumsan metus dignissim ut erat, venenatis vitae vestibulum massa. Rhoncus senectus, mauris at ac lorem parturient ante, mollis in nibh dolor. Mollis felis morbi tortor in nunc, augue diamlorem eget orci lacus eiusmod vivamus. Non a ut rhoncus sem libero metus, feugiat mauris feugiat turpis mi lacinia arcu. Arcu lorem imperdiet varius blandit, laoreet libero rhoncus nulla et, dui nec lacus, quis enim et nisl, orci orci.
Donec nonummy, dui commodo lectus tellus wisi tortor. Non tellus massa vehicula lacinia metus, proin nulla semper, tincidunt pretium bibendum justo sed neque sit. Nunc et pellentesque quis risus a. Pellentesque nunc rutrum vel venenatis duis, eu ut, cursus morbi at torquent cursus, nibh risus, nunc quisque eum amet libero vitae. Cras ullamcorper dictum mauris, ut gravida elit, risus sed, integer elementum nam, in integer nibh. Mollis et in est montes integer nec, congue sit, cras semper nunc a justo quis quam, netus vivamus nonummy ante gravida.
Sem primis in, at dolor pulvinar ac blandit praesent, libero a aliquet dolores. At scelerisque dui blandit id, sociis pellentesque, egestas vestibulum, sed mauris congue. Urna turpis facilisis malesuada at, lacinia interdum pretium donec cras aliquam vitae, est ac sed leo odio eu id, mauris diam eget donec, sed ut vivamus ac dapibus id rutrum. Odio leo quis nibh, quasi euismod suscipit mollis libero, ipsum et, adipiscing dolor sollicitudin vel sed sagittis magnis, et iaculis lorem orci ipsa.
Nec arcu, aenean auctor, sem mi orci. Aenean viverra habitasse nunc nunc pharetra. Magna a condimentum non sem. Ut praesent habitant semper justo, iaculis et orci eu dolor euismod. Nec vivamus aliquid ipsum massa, fusce massa nam, sodales metus consectetuer diam, et in lectus.")

s5 = Story.create(user_id: u2.id, title: "hello world", subtitle: "anthony davis jamal murray jj redick im basketball", content: "Lorem ipsum dolor sit amet, molestie bibendum. Lorem varius lobortis, urna molestie, vel pellentesque dolor ipsum pharetra, wisi ultricies aliquam quis non elementum in. Ac pede, ultricies dolor arcu lectus. Leo suspendisse ullamcorper, fermentum malesuada pulvinar molestie eros sit. Id neque ipsum tortor scelerisque. Blandit velit. Vulputate nam sed. Et odio ante odio suspendisse ad tortor, consectetuer quisque commodo ad, pellentesque pellentesque, arcu malesuada tellus sed, hendrerit arcu nullam aliquam consectetuer. Curabitur quis euismod at erat, tempus amet per lacus, et morbi justo arcu donec at, massa lacus eget justo malesuada turpis. Sit quam urna aenean, pellentesque posuere consequatur eu quis aliquam, nulla et.
Ut nullam urna phasellus integer, accumsan metus dignissim ut erat, venenatis vitae vestibulum massa. Rhoncus senectus, mauris at ac lorem parturient ante, mollis in nibh dolor. Mollis felis morbi tortor in nunc, augue diamlorem eget orci lacus eiusmod vivamus. Non a ut rhoncus sem libero metus, feugiat mauris feugiat turpis mi lacinia arcu. Arcu lorem imperdiet varius blandit, laoreet libero rhoncus nulla et, dui nec lacus, quis enim et nisl, orci orci.
Donec nonummy, dui commodo lectus tellus wisi tortor. Non tellus massa vehicula lacinia metus, proin nulla semper, tincidunt pretium bibendum justo sed neque sit. Nunc et pellentesque quis risus a. Pellentesque nunc rutrum vel venenatis duis, eu ut, cursus morbi at torquent cursus, nibh risus, nunc quisque eum amet libero vitae. Cras ullamcorper dictum mauris, ut gravida elit, risus sed, integer elementum nam, in integer nibh. Mollis et in est montes integer nec, congue sit, cras semper nunc a justo quis quam, netus vivamus nonummy ante gravida.
Sem primis in, at dolor pulvinar ac blandit praesent, libero a aliquet dolores. At scelerisque dui blandit id, sociis pellentesque, egestas vestibulum, sed mauris congue. Urna turpis facilisis malesuada at, lacinia interdum pretium donec cras aliquam vitae, est ac sed leo odio eu id, mauris diam eget donec, sed ut vivamus ac dapibus id rutrum. Odio leo quis nibh, quasi euismod suscipit mollis libero, ipsum et, adipiscing dolor sollicitudin vel sed sagittis magnis, et iaculis lorem orci ipsa.
Nec arcu, aenean auctor, sem mi orci. Aenean viverra habitasse nunc nunc pharetra. Magna a condimentum non sem. Ut praesent habitant semper justo, iaculis et orci eu dolor euismod. Nec vivamus aliquid ipsum massa, fusce massa nam, sodales metus consectetuer diam, et in lectus.")

tag1 = Tag.create(tag_desc: "Sports")
tag2 = Tag.create(tag_desc: "Science")
tag3 = Tag.create(tag_desc: "Technology")
tag4 = Tag.create(tag_desc: "Business")
tag5 = Tag.create(tag_desc: "Fashion")
tag6 = Tag.create(tag_desc: "Politics")

tagging1 = Tagging.create(story_id: s1.id, tag_id: tag1.id)
tagging2 = Tagging.create(story_id: s1.id, tag_id: tag2.id)
tagging3 = Tagging.create(story_id: s1.id, tag_id: tag3.id)

tagging4 = Tagging.create(story_id: s2.id, tag_id: tag1.id)
tagging5 = Tagging.create(story_id: s2.id, tag_id: tag2.id)
tagging6 = Tagging.create(story_id: s2.id, tag_id: tag3.id)
tagging7 = Tagging.create(story_id: s2.id, tag_id: tag4.id)
tagging8 = Tagging.create(story_id: s2.id, tag_id: tag5.id)
tagging9 = Tagging.create(story_id: s2.id, tag_id: tag6.id)

tagging10 = Tagging.create(story_id: s3.id, tag_id: tag1.id)
tagging11 = Tagging.create(story_id: s3.id, tag_id: tag2.id)
tagging12 = Tagging.create(story_id: s3.id, tag_id: tag3.id)
tagging13 = Tagging.create(story_id: s3.id, tag_id: tag4.id)

tagging14 = Tagging.create(story_id: s4.id, tag_id: tag5.id)
tagging15 = Tagging.create(story_id: s4.id, tag_id: tag6.id)

tagging16 = Tagging.create(story_id: s5.id, tag_id: tag1.id)
tagging17 = Tagging.create(story_id: s5.id, tag_id: tag2.id)
tagging18 = Tagging.create(story_id: s5.id, tag_id: tag3.id)
tagging19 = Tagging.create(story_id: s5.id, tag_id: tag4.id)
tagging20 = Tagging.create(story_id: s5.id, tag_id: tag5.id)
tagging21 = Tagging.create(story_id: s5.id, tag_id: tag6.id)
