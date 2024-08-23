import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className=''>
           <h1 className='text-3xl font-semibold text-center my-7'>About IdeaFusion's Blog</h1>
           <div className='text-md text-gray-500 flex flex-col gap-6'>
              <p>
                Welcome to  IdeaFusion's Blog is a blog that aims to provide a platform for users to read and 
                share their thoughts on different topics.
                I hope you enjoy reading my blog.
              </p>
              <p>
                We believe in open communication and collaboration. We encourage users to share their ideas and thoughts with us.
                We are always looking for new and innovative ideas to add to our platform.
              </p>
              <p>
                If you have any questions or comments, please don't hesitate to reach out to us. We are here to help.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default About