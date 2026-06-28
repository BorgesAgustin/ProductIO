<?php
$is_app_page = (basename($_SERVER['PHP_SELF']) !== 'onboarding.php' && basename($_SERVER['PHP_SELF']) !== 'login.php');
?>
    <?php if ($is_app_page): ?>
    </main> <!-- closes .app__content -->
    </div> <!-- closes .app__main -->
    </div> <!-- closes .app -->
    <?php endif; ?>
    
    <!-- Global Scripts -->
    <script src="../assets/js/common.js"></script>
</body>
</html>
