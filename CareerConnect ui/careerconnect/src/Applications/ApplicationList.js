import React from 'react'
import Application from './Application'

const ApplicationList = ({data,currentPage,getAllApplications}) => {
    
  return (
    <main className='main d-flex justify-content-center'>
        <h3>Applications</h3>
        {data?.content?.length === 0 && <div>No Applications</div>}
        <ul className='Application_list'>
            {data?.content?.length > 0 && data.content.map(Application => <Application Application={Application} key={Application.ID}/>)}
        </ul>
        {data?.content?.length === 0 && data?.totalPages > 1 && 
            <div className='pagination'>
                <a onClick={()=>getAllApplications(currentPage-1)} className={0 === currentPage? 'disabled':''}>
                    &laquo;
                </a>

                {data && [...Array(data.totalPages).keys()].map((page,index)=> 
                    <a onClick={getAllApplications(page)} className={currentPage === page?'active':''}key={page}>{page+1}</a>)}
                    
                <a onClick={()=>getAllApplications(currentPage+1)} className={data.totalPages === currentPage+1? 'disabled':''}>
                    &raquo;
                </a>
            </div>
        }
    </main>
  )
}

export default ApplicationList