<?php

/*
 * This is the base controller, whose function is it get all of the fundamental datas of a page/post.
 *
 * It is not meant to be used as is, but to be extended, which is why it was designed as an abstract class.
 */


abstract class NS_Controller
{

    public $id;
    public $post;
    public $title;
    public $thumbnail;
    public $content;
    public $class;

    /**
     * NS_Controller constructor.
     */
    public function __construct()
    {
        $this->id = get_the_ID();
        $this->post = get_post($this->id);
        $this->title = $this->setTitle();
        $this->content = $this->sanitizeContent();
        $this->thumbnail = $this->setThumbnail();
        $this->class = $this->setClass();
    }

    /**
     * @return string
     */

    private function setThumbnail()
    {
        $thumbnail = get_the_post_thumbnail();

        return $thumbnail;
    }

    /**
     * @return string
     */
    private function setTitle()
    {
        $title = get_the_title($this->id);

        return $title;
    }

    /**
     * @return string
     */
    private function sanitizeContent()
    {
        $content = $this->post->post_content;

        return $content;

    }

    /**
     * @return mixed|string
     */
    private function setClass()
    {
        $class = strtolower($this->title);
        $class = str_replace(' ', '-', $class);

        return $class;
    }
}