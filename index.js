const postBody = document.getElementById("postBody");
const postTitle = document.getElementById("titleInput");
const postWriter = document.getElementById("writerInput");
const postDesc = document.getElementById("descArea");
const postTags = document.getElementById("tagsInput");
const shareBttn = document.getElementById("shareBttn");
const likeBttn = document.getElementById("likeBttn");
const imageInput = document.querySelector("#imageInput");

const mainDiv = document.createElement("div");

const savedLCPosts = localStorage.getItem("post");
const parseSavedLCPosts = JSON.parse(savedLCPosts) || [];
let savedPosts = [...parseSavedLCPosts];


const postUtil = (title,writer,desc,tags,img) => {
    const showTitle = document.createElement("p");
    showTitle.innerHTML += title;
    showTitle.className = "show-title";
  
    const showWriter = document.createElement("p");
    showWriter.innerHTML += writer;
    showWriter.className = "show-writer";
  
    const showDesc = document.createElement("P");
    showDesc.innerHTML += desc;
    showDesc.className = "show-desc";
  
  
  
    if (imageInput) {
      const showImg = document.createElement("div");
      showImg.innerHTML += img;
      showImg.setAttribute("id", "displayImage");
      imageInput.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploadedImage = reader.result;
          document.getElementById("imageInput").style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(this.files[0]);
      });
      mainDiv.appendChild(showImg);
    };
  
  
  
  
  
    likeBttn.style.display = "flex";
    likeBttn.style.marginTop = ".8rem";
  
  
    const likedState = () => {
      likeBttn.style.color = "red";
    };
    likeBttn.addEventListener("click", likedState);
  
  
  
  
  
    if (postTags) {
      const showTags = document.createElement("div");
      showTags.className = "tags";
      showTags.innerHTML += "tags:" + tags;
      mainDiv.appendChild(showTags);
      const tagSplit = tags.split(",");
      tagSplit.map(str => str.trim());
    };
  
  
  
  
    showTitle.append(likeBttn);
    mainDiv.appendChild(showTitle);
    mainDiv.appendChild(showWriter);
    mainDiv.appendChild(showDesc);
    postBody.appendChild(mainDiv);
};


savedPosts.forEach((post) => {
    postUtil(post.tittle , post.writer , post.desc , post.tags , post.img)
});

const postMaker = (event) => {
  event.preventDefault();

  if (!postTitle.value) {
    return alert("please enter a title");
  };

  if (!postDesc.value) {
    return alert("please enter a Description for your post");
  };

  const postInfo = {
    tittle: postTitle.value,
    writer: postWriter.value,
    desc: postDesc.value,
    tags: postTags.value,
    img: imageInput.value,
  };

  savedPosts.push(postInfo);
  console.log(savedPosts);
  localStorage.setItem("post", JSON.stringify(savedPosts));



  postUtil(postInfo.tittle , postInfo.writer , postInfo.desc , postInfo.tags , postInfo.img)
};

shareBttn.addEventListener("click", postMaker);