$(document).ready(function() {
    // Function to fetch and update the statistics numbers
    function updateStatistics() {
      // Make AJAX requests to fetch the statistics data from SWAPI
      $.ajax({
        url: 'https://swapi.dev/api/people/',
        method: 'GET',
        success: function(response) {
          // Update the number of people (characters)
          $('.stat-item:nth-child(1) .stat-number').text(response.count);
        }
      });
  
      $.ajax({
        url: 'https://swapi.dev/api/starships/',
        method: 'GET',
        success: function(response) {
          // Update the number of starships (vehicles)
          $('.stat-item:nth-child(2) .stat-number').text(response.count);
        }
      });
  
      $.ajax({
        url: 'https://swapi.dev/api/planets/',
        method: 'GET',
        success: function(response) {
          // Update the number of planets
          $('.stat-item:nth-child(3) .stat-number').text(response.count);
        }
      });
  
      // For the "Prochaine mission", you need to decide how to fetch and update this information
      // Since SWAPI doesn't provide mission data, you'll need to use a different API or data source
      // You can update this part of the code according to your needs.
      // Example:
      // $.ajax({
      //   url: 'your-mission-api-endpoint',
      //   method: 'GET',
      //   success: function(response) {
      //     $('.stat-item:nth-child(4) .stat-number').text(response.next_mission_date);
      //   }
      // });
      $('.stat-item:nth-child(4) .stat-number').text('82');
    }
  
    // Call the updateStatistics function when the document is ready
    updateStatistics();
  });