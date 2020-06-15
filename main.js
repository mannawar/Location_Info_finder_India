        //Listen for submit
        document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

        //Listen for delete button in UI
        document.querySelector('body').addEventListener('click', deleteLocation);

        function getLocationInfo(e) {

            //Get zip value from input
            const zip = document.querySelector('.zip').value;
            
            //Make request
            fetch(`https://api.postalpincode.in/pincode/${zip}`)
            .then(response => {
               if(response.status != 200) {
                   showIcon('remove');
                   document.querySelector('#output').innerHTML=`<article class="message is-danger"> <div class="message-body">Invalid zip code, please try again </div> </article>`;
                   throw Error(response.statusText);
               } else {
                   showIcon('check');
                   return response.json();
               }
            })
            .then(data => {
                let output = [];
                console.log(data);
                data[0].PostOffice.forEach(place => {
                    output += `<article class="message is-primary">
                    <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                    </div>
                    <div class="message-body">
                        <ul>
                            <li><strong> Name of Locality: </strong>${place['Name']}</li>
                            <li><strong> Branch Type: </strong>${place['BranchType']}</li>
                            <li><strong> Delivery status: </strong>${place['DeliveryStatus']}</li>
                            <li><strong> District: </strong>${place['District']}</li> 
                            <li><strong> Region: </strong>${place['Region']}</li>
                            <li><strong> State: </strong>${place['State']}</li>
                            <li><strong> Country: </strong>${place['Country']}</li>
                        </ul>
                    </div>
                </article>`;
                })
                //Display into output div
                document.querySelector('#output').innerHTML=output;
            })
            .catch(err => console.log(err))

            e.preventDefault();
        }
        function showIcon(icon) {
            //check none is being displayed
            document.querySelector('.icon-check').style.display='none';
            document.querySelector('.icon-remove').style.display='none';

            //display correct icons
            document.querySelector(`.icon-${icon}`).style.display='inline-flex';
        }

        //Delete Location box
        function deleteLocation(e) {
            if(e.target.className == "delete") {
                document.querySelector('.message').remove();
                document.querySelector('.icon-check').style = 'none';
                document.querySelector('.zip').value = '';
                
            }
        }