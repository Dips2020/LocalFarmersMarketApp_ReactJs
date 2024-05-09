// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function BlogPosts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const postsPerPage = 6; // Number of posts per page

  const posts = [
    {
      id: 1,
      title: 'Why Shopping at Your Local Farmer Market is Important',
      author: 'Jane Doe',
      date: 'April 20, 2024',
      content: 'Shopping at your local farmer\'s market is important for several reasons. Firstly, it supports local farmers and producers, helping them sustain their livelihoods and preserve agricultural traditions. Additionally, buying locally reduces the carbon footprint associated with transportation, as produce travels shorter distances from farm to table. Furthermore, farmer\'s markets often offer fresher and more diverse produce compared to supermarkets, contributing to a healthier diet and lifestyle. By shopping at your local farmer\'s market, you can make a positive impact on your community and the environment while enjoying high-quality, seasonal produce.',
      image: 'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Benefits',
    },
    {
      id: 2,
      title: '10 Tips for Getting the Best Deals at the Farmer Market',
      author: 'John Smith',
      date: 'April 15, 2024',
      content: 'Shopping at the farmer\'s market can be a rewarding experience, but it\'s essential to know how to get the best deals. Here are 10 tips to help you make the most of your farmer\'s market visit: 1. Arrive early to get the freshest produce and widest selection. 2. Bring cash, as many vendors may not accept cards. 3. Take a lap around the market before making purchases to compare prices and quality. 4. Buy in bulk or bundle deals to save money. 5. Get to know the vendors and build relationships for potential discounts. 6. Shop towards the end of the day for potential markdowns on unsold items. 7. Look for "ugly" produce, which may be sold at a lower price but still tastes delicious. 8. Bring your own reusable bags to reduce waste and potentially get discounts. 9. Ask vendors about their specials or deals of the day. 10. Don\'t be afraid to negotiate prices, especially if you\'re buying in bulk. By following these tips, you can stretch your budget and enjoy the freshest produce at the farmer\'s market.',
      image: 'https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Tips',
    },
  
    {  id: 3,
      title: 'The Health Benefits of Eating Seasonal Produce',
      author: 'Emily Johnson',
      date: 'April 25, 2024',
      content: 'Eating seasonal produce has numerous health benefits. Seasonal fruits and vegetables are often fresher and contain higher levels of essential nutrients compared to produce that is picked before it is ripe and transported long distances. Additionally, consuming seasonal produce supports local farmers and reduces the carbon footprint associated with transportation. Incorporating seasonal fruits and vegetables into your diet can help improve overall health and well-being.',
      image: 'https://images.unsplash.com/photo-1576181456177-2b99ac0aa1ef?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Health'
    },
    {
      id: 4,
      title: 'Supporting Local Farmers: A Sustainable Choice',
      author: 'Michael Smith',
      date: 'April 28, 2024',
      content: 'Supporting local farmers is not only good for the environment but also for the local economy. By purchasing food from local farmers markets, consumers can reduce the carbon footprint associated with transporting goods long distances. Additionally, supporting local farmers helps to preserve farmland and promotes biodiversity. Choosing locally sourced food is a sustainable choice that benefits both individuals and communities.',
      image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Sustainability'
    },
    {
      id: 5,
      title: 'Tips for Buying Fresh Produce at the Farmer\'s Market',
      author: 'Sarah Adams',
      date: 'May 5, 2024',
      content: 'Navigating a farmer\'s market can be overwhelming, but with a few tips, you can ensure you\'re getting the freshest produce available. First, arrive early to get the best selection. Second, bring cash as many vendors may not accept cards. Third, don\'t be afraid to ask questions - farmers are often happy to share information about their products. Lastly, be flexible and open to trying new things!',
      image: 'https://plus.unsplash.com/premium_photo-1686269460461-2273fbe86711?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Tips'
    },
    {
      id: 6,
      title: 'The Environmental Impact of Food Transportation',
      author: 'David Wilson',
      date: 'May 10, 2024',
      content: 'The transportation of food has a significant environmental impact, contributing to greenhouse gas emissions and air pollution. Food that is transported long distances requires more fuel, leading to increased carbon emissions. By choosing locally sourced food, consumers can help reduce the environmental footprint associated with food transportation. Supporting local farmers and markets is an important step towards mitigating climate change and promoting sustainability.',
      image: 'https://images.unsplash.com/photo-1554486855-60050042cd53?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Sustainability'
    },
      // Add more posts as needed

  ];

  // Sorting function
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Filtering function
  const filteredPosts = sortedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (currentCategory === 'All' || post.category === currentCategory)
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open post detail modal
  const openModal = (post) => {
    setSelectedPost(post);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto my-8">
      {/* Search, Sort, and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        {/* Search bar */}
        <div className="mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search posts"
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Sort dropdown */}
        <div className="mb-4 md:mb-0">
          <label htmlFor="sortBy" className="mr-2 text-[14px] text-white font-semibold">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>
        {/* Category filter */}
        <div className="mb-4 md:mb-0 ">
          <label htmlFor="categoryFilter" className="mr-2 text-[14px] text-white font-semibold">
            Filter By Category:
          </label>
          <select
            id="categoryFilter"
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Benefits">Benefits</option>
            <option value="Tips">Tips</option>
            <option value="Health">Health</option>
            <option value="Sustainability">Sustainability</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      {/* Posts */}
      <h2 className="text-3xl font-bold mb-4 text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-2 cursor-pointer" onClick={() => openModal(post)}>{post.title}</h2>
            <p className="text-gray-600 mb-2">By {post.author} | {post.date}</p>
            <img src={post.image} alt={post.title} className="mb-4 h-[300px] w-[300px] rounded-md" />
            <p className="mb-4">{post.content.substring(0, 150)}...</p> 
            <button className="bg-[#069E2D] mt-2 hover:bg-[#04773B] text-white py-2 px-4 rounded-md" onClick={() => openModal(post)}>Read More</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        {filteredPosts.length > postsPerPage && (
          <nav className="flex justify-center">
            {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`mx-2 px-4 py-2 rounded-lg ${
                  currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </nav>
        )}
      </div>

      
      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed top-[50px] left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-white p-8 rounded-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button className="absolute middle-4 right-5 text-gray-600" onClick={closeModal}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <p className="text-gray-600 mb-2">By {selectedPost.author} | {selectedPost.date}</p>
            <img src={selectedPost.image} alt={selectedPost.title} className="mb-4 h-[400px] rounded-lg" />
            <p className="mb-4">{selectedPost.content}</p>
            
          </div>
        </div>



      )}
    </div>
  );
}

export default BlogPosts;
