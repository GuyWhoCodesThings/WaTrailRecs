import { IoTrailSignOutline } from "react-icons/io5";

const About = () => {
    return (
        <div className="w-full h-fit mt-6 mb-6 text-sm">
            <div className="flex justify-center items-center text-4xl font-light">
                <IoTrailSignOutline size={40} className="text-emerald-600" />
                WaTrailRecs
            </div>
            <h5 className="text-lg font-light mb-2 mt-2">How to Search</h5>
            <div className="flex justify-center">
            <ul className="list-decimal text-left w-2/3 lg:max-w-[600px] md:max-w-[600px] sm:w-1/2 flex flex-col gap-3 justify-start items-center">
                <li>
                    find a hike from the list or through the search bar
                </li>
                <li>
                    click on the "Select" button
                </li>
                <li>
                    Adjust the search settings to your liking, moving a slider further left will decrease its importance when calculating the similarity. For best results, include all areas.
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