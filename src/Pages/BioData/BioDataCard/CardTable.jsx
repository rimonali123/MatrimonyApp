

const CardTable = ({item}) => {
    return (
        <div>
            <div className="container mx-auto sm:p-4 dark:text-gray-800">
               
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <colgroup>
                            
                            <col />
                            <col />
                        </colgroup>
                       
                        <tbody>
                            <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3 border-r">
                                    <p>Permanent Division</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.parmanentDivision}</p>
                                </td>
                            </tr>

                            <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3 border-r">
                                    <p>Age</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.age}</p>
                                </td>
                            </tr>

                            <tr className="border border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3 border-r">
                                    <p>Occupation</p>
                                </td>
                                <td className="p-3">
                                    <p>{item.occupation}</p>
                                </td>
                            </tr>

                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CardTable;