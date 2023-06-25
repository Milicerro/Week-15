class FooterPage {

    get copyRight() {
        return $("#page_wrapper > footer > div");
    }

    get facebook() {
        return $("#page_wrapper > footer > ul > li.social_facebook");
    }

    get twitter() {
        return $("#page_wrapper > footer > ul > li.social_twitter");
    }

    get linkedin() {
        return $("#page_wrapper > footer > ul > li.social_linkedin");
    }
}

export default new FooterPage();