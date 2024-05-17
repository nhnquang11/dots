const BlogCard = () => {
  return (
    <div className="max-w-2xl">
      <div>
        <img className="rounded-lg aspect-video object-cover" src="https://images.ctfassets.net/kftzwdyauwt9/6FFDUhM1G4L7yaETOVhMSF/801042f92d5c9de0e872fbf3f1959cfd/partnership-with-american-journalism-project-to-support-local-news.jpg?w=1200&q=90&fm=webp" />
      </div>
      <article className="mt-3">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="font-serif text-neutral-500">Mar 16, 2020</time>
          <a href="#" className="font-serif font-medium rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-700 hover:bg-neutral-200">Typology</a>
        </div>
        <div>
          <h3 className="font-serif mt-3 text-lg leading-6 font-semibold text-neutral-900 group-hover:text-neutral-600">
            <a href="#">
              Trực giác hướng nội
            </a>
          </h3>
          <p className="font-serif mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">Trong khoảnh khắc, mọi người coi chúng tôi là điên rồ hoặc ngu ngốc. Họ không thấy cách chúng tôi nhìn thấy bức tranh toàn cảnh, sự kết nối tổng thể của thông tin và kết luận cuối cùng. Nhưng một khi họ làm được, muộn hơn rất nhiều, họ sẽ thấy tất cả các mảnh ghép ăn khớp như thế nào, và tại sao chúng tôi chơi tàn cuộc, và thực hiện nước chiếu tướng. Chúng tôi không chính xác và rõ ràng, nhưng chúng tôi có thể xấp xỉ với kết quả đó.</p>
          <p className="font-serif mt-4 text-xs text-neutral-500">10 min read</p>
        </div>
      </article>
    </div>
  )
}

export default BlogCard