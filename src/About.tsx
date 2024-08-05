const About = () => {
    return (
        <div className="w-full h-fit mt-6 mb-6 text-sm">
           
            <h5 className="text-3xl mb-2">How to Search</h5>
            <div className="flex justify-center">
            <ul className="list-decimal text-left w-2/3 lg:max-w-[400px] md:max-w-[400px] sm:w-1/2 flex flex-col gap-3">
                <li>
                    find a hike from the list or through the search bar
                </li>
                <li>
                    click on the "Select" button
                </li>
                <li>
                    Adjust the search settings to your liking, moving a slider further left will decrease its importance when calculating the similarity
                </li>
                <li>
                    Click on the "Find" button to display the results
                </li>
                <li>
                    The best matches will have a lower score and show up at the top of the list
                </li>
            </ul>
            </div>
        </div>
    )
}

export default About;